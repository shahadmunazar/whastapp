const express = require('express');
const router = express.Router();
const { SystemStat } = require('../models');

router.post('/visit', async (req, res) => {
    try {
        const [stat, created] = await SystemStat.findOrCreate({
            where: { key: 'visitCount' },
            defaults: { value: 0 }
        });
        
        stat.value += 1;
        await stat.save();
        
        res.json({ status: true, visitCount: stat.value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
