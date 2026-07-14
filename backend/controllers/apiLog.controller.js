const { ApiLog, Project } = require('../models');

class ApiLogController {
    async getLogs(req, res) {
        try {
            const { projectId } = req.query;
            const whereClause = { userId: req.user.id };
            
            if (projectId && projectId !== 'all') {
                if (projectId === 'global') {
                    whereClause.projectId = null;
                } else {
                    whereClause.projectId = projectId;
                }
            }

            const logs = await ApiLog.findAll({
                where: whereClause,
                include: [{ model: Project, as: 'project', attributes: ['name', 'number'] }],
                order: [['createdAt', 'DESC']],
                limit: 1000
            });

            res.json(logs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ApiLogController();
