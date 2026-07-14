const { SalesQuery } = require('../models');

exports.createQuery = async (req, res) => {
    try {
        const { message, name, email } = req.body;
        const userId = req.user.id; // from auth middleware

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const query = await SalesQuery.create({
            userId,
            name,
            email,
            message,
            status: 'pending'
        });

        res.status(201).json({ message: 'Query submitted successfully', query });
    } catch (error) {
        console.error('Error creating sales query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createPublicQuery = async (req, res) => {
    try {
        const { message, name, email } = req.body;

        if (!message || !name || !email) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const query = await SalesQuery.create({
            name,
            email,
            message,
            status: 'pending'
        });

        res.status(201).json({ message: 'Query submitted successfully', query });
    } catch (error) {
        console.error('Error creating public sales query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
