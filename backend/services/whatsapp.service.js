const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const Message = require('../models/Message');
const Project = require('../models/Project');

class WhatsAppService {
    constructor() {
        this.clients = {};
    }

    async getQR(projectId, projectModel) {
        if (!this.clients[projectId]) {
            const client = new Client({
                authStrategy: new LocalAuth({ clientId: `project-${projectId}` }),
                puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            });

            client.qrData = '';
            
            client.on('qr', async (qr) => {
                client.qrData = await qrcode.toDataURL(qr);
            });

            client.on('ready', async () => {
                client.qrData = 'connected';
                await projectModel.update({ status: 'connected' });
            });

            // Phase 1: Webhooks & Incoming Messages
            client.on('message', async (msg) => {
                const project = await Project.findByPk(projectId);
                
                // Save incoming message
                await Message.create({
                    projectId: projectId,
                    from: msg.from.replace('@c.us', ''),
                    to: project.number || 'unknown',
                    content: msg.body,
                    status: 'received'
                });

                if (project && project.webhookUrl) {
                    try {
                        fetch(project.webhookUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                appId: project.appId,
                                from: msg.from.replace('@c.us', ''),
                                to: project.number,
                                message: msg.body,
                                timestamp: new Date().toISOString(),
                                type: 'chat'
                            })
                        }).catch(err => console.error('Webhook fetch error:', err.message));
                    } catch (e) {
                        console.error('Webhook error:', e);
                    }
                }
            });

            client.on('disconnected', async (reason) => {
                const project = await Project.findByPk(projectId);
                if (project) await project.update({ status: 'disconnected' });
                
                if (project && project.webhookUrl) {
                    fetch(project.webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ event: 'disconnected', appId: project.appId, reason })
                    }).catch(console.error);
                }
                
                if (this.clients[projectId]) {
                    delete this.clients[projectId];
                }
            });

            client.initialize();
            this.clients[projectId] = client;
        }

        return this.clients[projectId].qrData;
    }

    async sendMessage(projectId, number, message, projectModel, mediaUrl = null) {
        const client = this.clients[projectId];
        if (!client || client.qrData !== 'connected') {
            throw new Error('WhatsApp not connected');
        }

        const usageService = require('./usage.service');
        await usageService.checkMessageLimit(projectModel.userId);
        
        let sentMsg;
        if (mediaUrl) {
            const media = await MessageMedia.fromUrl(mediaUrl);
            sentMsg = await client.sendMessage(number + '@c.us', media, { caption: message });
        } else {
            sentMsg = await client.sendMessage(number + '@c.us', message);
        }
        
        // Save to Database
        await Message.create({
            projectId: projectId,
            from: projectModel.number || 'unknown',
            to: number,
            content: mediaUrl ? `[Media: ${mediaUrl}] ${message || ''}` : message,
            status: 'sent'
        });

        return { status: true };
    }

    async disconnect(projectId, projectModel) {
        const client = this.clients[projectId];
        if (client) {
            try {
                await client.logout();
                await client.destroy();
            } catch (err) {
                console.error('Error during WhatsApp disconnect:', err);
            }
            delete this.clients[projectId];
        }
        await projectModel.update({ status: 'disconnected' });
        return { status: true };
    }
}

module.exports = new WhatsAppService();
