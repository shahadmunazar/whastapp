const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const projectToken = req.headers['x-project-token'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check for Project Token first (API usage)
    if (projectToken) {
        const project = await Project.findOne({ where: { apiToken: projectToken } });
        if (project) {
            req.user = { id: project.userId, role: 'user', projectId: project.id };
            return next();
        }
    }

    // Fallback to JWT (Dashboard usage)
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Try to decode without verification just to get the user ID for logging purposes
            const decoded = jwt.decode(token);
            if (decoded && decoded.id) {
                req.user = { id: decoded.id };
            }
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'Access denied. Superadmin only.' });
    }
    next();
};

module.exports = { authenticateToken, isAdmin };
