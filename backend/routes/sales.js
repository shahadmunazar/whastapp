const express = require('express');
const router = express.Router();
const salesQueryController = require('../controllers/salesQuery.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/query', authenticateToken, salesQueryController.createQuery);
router.post('/public-query', salesQueryController.createPublicQuery);

module.exports = router;
