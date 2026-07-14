const projectService = require('../services/project.service');
const whatsappService = require('../services/whatsapp.service');

class ProjectController {
    async getProjects(req, res) {
        try {
            const projects = await projectService.getUserProjects(req.user.id);
            res.json(projects);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async adminGetAllProjects(req, res) {
        try {
            const projects = await projectService.getAllProjects();
            res.json(projects);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createProject(req, res) {
        try {
            const project = await projectService.createProject(req.user.id, req.body);
            res.json(project);
        } catch (err) {
            console.error('Create Project Error:', err);
            res.status(400).json({ error: err.message });
        }
    }

    async getQR(req, res) {
        try {
            const project = await projectService.getProjectById(req.params.id, req.user.id);
            if (!project) return res.status(404).json({ error: 'Project not found' });

            const qr = await whatsappService.getQR(req.params.id, project);
            res.json({ qr });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async sendMessage(req, res) {
        try {
            const { number, message, appId, apiToken, mediaUrl } = req.body;
            const project = await projectService.getProjectById(req.params.id, req.user.id);
            
            if (!project) return res.status(404).json({ error: 'Project not found' });

            // Optional: Extra verification if provided in body
            if (appId && project.appId !== appId) return res.status(401).json({ error: 'Invalid App ID' });
            if (apiToken && project.apiToken !== apiToken) return res.status(401).json({ error: 'Invalid API Token' });

            const result = await whatsappService.sendMessage(req.params.id, number, message, project, mediaUrl);
            res.json(result);
        } catch (err) {
            if (err.message.includes('limit reached') || err.message.includes('subscription')) {
                return res.status(403).json({ error: err.message });
            }
            res.status(400).json({ error: err.message });
        }
    }

    async disconnect(req, res) {
        try {
            const project = await projectService.getProjectById(req.params.id, req.user.id);
            if (!project) return res.status(404).json({ error: 'Project not found' });

            const result = await whatsappService.disconnect(req.params.id, project);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getMessages(req, res) {
        try {
            const messages = await projectService.getProjectMessages(req.params.id);
            res.json(messages);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAllUserMessages(req, res) {
        try {
            const messages = await projectService.getAllUserMessages(req.user.id);
            res.json(messages);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteProject(req, res) {
        try {
            await projectService.deleteProject(req.params.id, req.user.id);
            res.json({ message: 'Project soft deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async forceDeleteProject(req, res) {
        try {
            await projectService.forceDeleteProject(req.params.id, req.user.id);
            res.json({ message: 'Project permanently deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateProject(req, res) {
        try {
            const project = await projectService.updateProject(req.params.id, req.user.id, req.body);
            res.json(project);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getStats(req, res) {
        try {
            const stats = await projectService.getStats(req.user.id);
            res.json(stats);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ProjectController();
