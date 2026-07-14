const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, campaignController.createCampaign);
router.get('/', authenticateToken, campaignController.getUserCampaigns);
router.get('/:id', authenticateToken, campaignController.getCampaignDetails);
router.post('/:id/leads', authenticateToken, campaignController.addLeads);
router.post('/:id/start', authenticateToken, campaignController.startCampaign);
router.post('/:id/stop', authenticateToken, campaignController.stopCampaign);
router.delete('/:id', authenticateToken, campaignController.deleteCampaign);

module.exports = router;
