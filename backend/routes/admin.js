const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth.middleware');

router.get('/users', authenticateToken, isAdmin, adminController.getAllUsers);
router.get('/stats', authenticateToken, isAdmin, adminController.getPlatformStats);
router.get('/payments', authenticateToken, isAdmin, adminController.getAllPayments);
router.put('/users/:userId/subscription', authenticateToken, isAdmin, adminController.updateUserSubscription);

module.exports = router;
