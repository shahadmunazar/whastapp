const { Campaign, CampaignLead, Project } = require('../models');
const whatsappService = require('../services/whatsapp.service');

class CampaignController {
    async createCampaign(req, res) {
        try {
            const { name, projectId, message, leads } = req.body;
            const userId = req.user.id;

            const campaign = await Campaign.create({
                name,
                projectId,
                message,
                userId,
                status: 'draft'
            });

            if (leads && Array.isArray(leads)) {
                const leadData = leads.map(phone => ({
                    campaignId: campaign.id,
                    phoneNumber: phone,
                    status: 'pending'
                }));
                await CampaignLead.bulkCreate(leadData);
            }

            res.status(201).json({ status: true, campaign });
        } catch (err) {
            res.status(400).json({ status: false, error: err.message });
        }
    }

    async getUserCampaigns(req, res) {
        try {
            const userId = req.user.id;
            const campaigns = await Campaign.findAll({
                where: { userId },
                include: [
                    { model: Project, as: 'project', attributes: ['name'] },
                    { model: CampaignLead, as: 'leads' }
                ],
                order: [['createdAt', 'DESC']]
            });
            res.json(campaigns);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getCampaignDetails(req, res) {
        try {
            const { id } = req.params;
            const campaign = await Campaign.findOne({
                where: { id, userId: req.user.id },
                include: [{ model: CampaignLead, as: 'leads' }]
            });
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
            res.json(campaign);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async addLeads(req, res) {
        try {
            const { id } = req.params;
            const { leads } = req.body;
            
            const campaign = await Campaign.findOne({ where: { id, userId: req.user.id } });
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

            if (leads && Array.isArray(leads)) {
                const leadData = leads.map(lead => {
                    if (typeof lead === 'string') {
                        return {
                            campaignId: id,
                            phoneNumber: lead,
                            status: 'pending'
                        };
                    }
                    return {
                        campaignId: id,
                        phoneNumber: lead.phoneNumber,
                        name: lead.name || null,
                        message: lead.message || null,
                        status: 'pending'
                    };
                });
                await CampaignLead.bulkCreate(leadData);
            }

            res.json({ status: true, message: `${leads.length} leads added successfully` });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async startCampaign(req, res) {
        try {
            const { id } = req.params;
            const { batchSize = 50, delayBetweenMessages = 5, delayBetweenBatches = 60, projectId } = req.body;
            
            const campaign = await Campaign.findOne({ 
                where: { id, userId: req.user.id },
                include: [{ model: Project, as: 'project' }]
            });
            
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

            if (projectId && campaign.projectId !== projectId) {
                // Update project if changed
                campaign.projectId = projectId;
                await campaign.save();
                // Reload with new project
                await campaign.reload({ include: [{ model: Project, as: 'project' }] });
            }

            if (!campaign.project) return res.status(400).json({ error: 'Associated project not found' });
            if (campaign.project.status !== 'connected') return res.status(400).json({ error: 'Selected project is not connected to WhatsApp' });

            const leads = await CampaignLead.findAll({ 
                where: { campaignId: id, status: 'pending' } 
            });

            if (leads.length === 0) {
                return res.status(400).json({ error: 'No pending leads to process' });
            }

            campaign.status = 'processing';
            await campaign.save();

            // Background processing
            (async () => {
                const totalLeads = leads.length;
                let currentIdx = 0;
                
                while (currentIdx < totalLeads) {
                    const chunk = leads.slice(currentIdx, currentIdx + batchSize);
                    
                    for (const lead of chunk) {
                        // Check if campaign was stopped by user
                        const currentCampaignState = await Campaign.findByPk(id);
                        if (currentCampaignState.status === 'stopped') {
                            console.log(`Campaign ${id} was stopped.`);
                            return; // Exit the background loop immediately
                        }

                        try {
                            const personalizedMessage = lead.message || campaign.message;
                            await whatsappService.sendMessage(
                                campaign.project.id, 
                                lead.phoneNumber, 
                                personalizedMessage,
                                campaign.project // pass the projectModel so it can log correctly
                            );
                            
                            lead.status = 'sent';
                            await lead.save();
                        } catch (error) {
                            console.error(`Failed to send campaign message to ${lead.phoneNumber}:`, error.message);
                            lead.status = 'failed';
                            lead.error = error.message;
                            await lead.save();

                            if (error.message.includes('limit reached') || error.message.includes('subscription')) {
                                console.log(`Campaign ${id} halted due to limits.`);
                                const currentCampaign = await Campaign.findByPk(id);
                                currentCampaign.status = 'stopped';
                                await currentCampaign.save();
                                return; // Stop processing further leads
                            }
                        }

                        // Delay between individual messages
                        await new Promise(resolve => setTimeout(resolve, delayBetweenMessages * 1000));
                    }
                    
                    currentIdx += batchSize;
                    
                    // Delay between batches (only if there are more leads)
                    if (currentIdx < totalLeads) {
                        // Check stop status during batch delay too
                        const currentCampaignState = await Campaign.findByPk(id);
                        if (currentCampaignState.status === 'stopped') return;
                        
                        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches * 1000));
                    }
                }

                const finalCampaignState = await Campaign.findByPk(id);
                if (finalCampaignState.status !== 'stopped') {
                    finalCampaignState.status = 'completed';
                    await finalCampaignState.save();
                }
            })();

            res.json({ status: true, message: 'Campaign started successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async stopCampaign(req, res) {
        try {
            const { id } = req.params;
            const campaign = await Campaign.findOne({ where: { id, userId: req.user.id } });
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
            
            if (campaign.status === 'completed' || campaign.status === 'stopped') {
                return res.status(400).json({ error: `Cannot stop campaign in ${campaign.status} state` });
            }

            campaign.status = 'stopped';
            await campaign.save();

            res.json({ status: true, message: 'Campaign stopped successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteCampaign(req, res) {
        try {
            const { id } = req.params;
            const campaign = await Campaign.findOne({ where: { id, userId: req.user.id } });
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

            if (campaign.status === 'processing') {
                return res.status(400).json({ error: 'Cannot delete a processing campaign. Stop it first.' });
            }

            // Delete all associated leads first
            await CampaignLead.destroy({ where: { campaignId: id } });
            // Delete the campaign
            await campaign.destroy();

            res.json({ status: true, message: 'Campaign deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CampaignController();
