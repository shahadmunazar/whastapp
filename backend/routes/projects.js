const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth.middleware');

router.get('/', authenticateToken, projectController.getProjects);
router.get('/stats', authenticateToken, projectController.getStats);
router.get('/messages/all', authenticateToken, projectController.getAllUserMessages);
router.post('/', authenticateToken, projectController.createProject);
router.get('/:id/qr', authenticateToken, projectController.getQR);
router.post('/:id/send', authenticateToken, projectController.sendMessage);
router.get('/:id/disconnect', authenticateToken, projectController.disconnect);
router.get('/:id/messages', authenticateToken, projectController.getMessages);
router.delete('/:id', authenticateToken, projectController.deleteProject);
router.delete('/:id/force', authenticateToken, projectController.forceDeleteProject);
router.put('/:id', authenticateToken, projectController.updateProject);

// Admin Routes
router.get('/admin/all', authenticateToken, isAdmin, projectController.adminGetAllProjects);

module.exports = router;
