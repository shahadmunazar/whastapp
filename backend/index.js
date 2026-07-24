const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const statsRoutes = require('./routes/stats');
const campaignRoutes = require('./routes/campaigns');
const apiLogRoutes = require('./routes/apiLogs');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const apiLogger = require('./middleware/apiLogger.middleware');
app.use(apiLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/logs', apiLogRoutes);
app.use('/api/sales', salesRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Start Server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
        app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();
