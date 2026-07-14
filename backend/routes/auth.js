const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.post('/subscribe', authenticateToken, authController.subscribe);

module.exports = router;
