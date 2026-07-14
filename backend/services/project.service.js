const { Project, Message, User, Subscription } = require('../models');

class ProjectService {
    async getUserProjects(userId) {
        return await Project.findAll({ where: { userId } });
    }

    async getAllProjects() {
        return await Project.findAll();
    }

    async createProject(userId, projectData) {
        const usageService = require('./usage.service');
        await usageService.checkProjectLimit(userId);

        const crypto = require('crypto');
        const appId = 'app_' + crypto.randomBytes(8).toString('hex');
        const apiToken = 'tok_' + crypto.randomBytes(16).toString('hex');
        
        return await Project.create({ 
            ...projectData, 
            userId,
            appId: projectData.appId || appId,
            apiToken: apiToken
        });
    }

    async getProjectById(projectId, userId) {
        return await Project.findOne({ where: { id: projectId, userId } });
    }

    async getProjectMessages(projectId) {
        return await Message.findAll({ 
            where: { projectId },
            order: [['createdAt', 'DESC']]
        });
    }

    async getAllUserMessages(userId) {
        const userProjects = await Project.findAll({
            where: { userId },
            attributes: ['id', 'name', 'number']
        });
        const projectIds = userProjects.map(p => p.id);
        
        const messages = await Message.findAll({
            where: { projectId: projectIds },
            order: [['createdAt', 'DESC']],
            raw: true
        });

        // Attach project name and number
        const projectMap = userProjects.reduce((acc, p) => ({ ...acc, [p.id]: { name: p.name, number: p.number } }), {});
        return messages.map(msg => ({
            ...msg,
            projectName: projectMap[msg.projectId]?.name || 'Unknown',
            projectNumber: projectMap[msg.projectId]?.number || 'Unknown'
        }));
    }

    async deleteProject(projectId, userId) {
        return await Project.destroy({ where: { id: projectId, userId } });
    }

    async forceDeleteProject(projectId, userId) {
        return await Project.destroy({ where: { id: projectId, userId }, force: true });
    }

    async updateProject(projectId, userId, updateData) {
        const project = await Project.findOne({ where: { id: projectId, userId } });
        if (!project) throw new Error('Project not found');

        const allowedFields = ['name', 'webhookUrl'];
        allowedFields.forEach(field => {
            if (updateData[field] !== undefined) {
                project[field] = updateData[field];
            }
        });
        await project.save();
        return project;
    }

    async getStats(userId) {
        // Total projects
        const totalProjects = await Project.count({ where: { userId } });
        
        // Active connections
        const activeConnections = await Project.count({ where: { userId, status: 'connected' } });
        
        // Message stats
        const userProjects = await Project.findAll({ where: { userId }, attributes: ['id'] });
        const projectIds = userProjects.map(p => p.id);
        
        let totalMessages = 0;
        let failedMessages = 0;
        let recentMessages = [];
        
        if (projectIds.length > 0) {
            totalMessages = await Message.count({ 
                where: { projectId: projectIds, status: 'sent' } 
            });
            
            failedMessages = await Message.count({ 
                where: { projectId: projectIds, status: 'failed' } 
            });

            recentMessages = await Message.findAll({
                where: { projectId: projectIds },
                limit: 5,
                order: [['createdAt', 'DESC']]
            });
        }

        const recentProjects = await Project.findAll({
            where: { userId },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        return {
            totalProjects,
            activeConnections,
            totalMessages,
            failedMessages,
            revenue: 0,
            recentActivities: [
                ...recentMessages.map(m => ({ type: 'message', content: `Message sent to ${m.to}`, time: m.createdAt })),
                ...recentProjects.map(p => ({ type: 'project', content: `Project "${p.name}" created`, time: p.createdAt }))
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 6)
        };
    }
}

module.exports = new ProjectService();
