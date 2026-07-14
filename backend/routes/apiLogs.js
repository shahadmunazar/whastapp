const express = require('express');
const router = express.Router();
const apiLogController = require('../controllers/apiLog.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/', authenticateToken, apiLogController.getLogs);

module.exports = router;
