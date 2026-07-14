const { User, Subscription, Project } = require('../models');

class AdminController {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] },
                include: [{
                    model: Subscription,
                    as: 'subscription'
                }]
            });

            // Count projects for each user
            const usersWithStats = await Promise.all(users.map(async (user) => {
                const projectCount = await Project.count({ where: { userId: user.id } });
                return {
                    ...user.toJSON(),
                    projectCount
                };
            }));

            res.json(usersWithStats);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateUserSubscription(req, res) {
        try {
            const { userId } = req.params;
            const { planType, status, expiresAt } = req.body;

            let subscription = await Subscription.findOne({ where: { userId } });
            if (!subscription) {
                subscription = await Subscription.create({ userId });
            }

            if (planType) subscription.planType = planType;
            if (status) subscription.status = status;
            if (expiresAt) subscription.expiresAt = new Date(expiresAt);

            await subscription.save();
            res.json({ status: true, subscription });
        } catch (err) {
            res.status(400).json({ status: false, error: err.message });
        }
    }

    async getAllPayments(req, res) {
        try {
            const { Payment, User } = require('../models');
            const payments = await Payment.findAll({
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email']
                }],
                order: [['createdAt', 'DESC']]
            });
            res.json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPlatformStats(req, res) {
        try {
            const { SystemStat, Payment } = require('../models');
            const totalUsers = await User.count();
            const totalProjects = await Project.count();
            const activeSubscriptions = await Subscription.count({ where: { status: 'active' } });
            const visitStat = await SystemStat.findOne({ where: { key: 'visitCount' } });
            
            const totalRevenue = await Payment.sum('amount', { where: { status: 'completed' } }) || 0;
            const totalTransactions = await Payment.count();

            res.json({
                totalUsers,
                totalProjects,
                activeSubscriptions,
                visitCount: visitStat ? visitStat.value : 0,
                totalRevenue,
                totalTransactions
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new AdminController();
