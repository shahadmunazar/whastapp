const { Subscription, Project, Message } = require('../models');
const { Op } = require('sequelize');

class UsageService {
    constructor() {
        this.limits = {
            starter: {
                projects: 1,
                messagesPerMonth: 1000
            },
            professional: {
                projects: 12,
                messagesPerMonth: 50000
            },
            enterprise: {
                projects: Infinity,
                messagesPerMonth: Infinity
            }
        };
    }

    async getActiveSubscription(userId) {
        const subscription = await Subscription.findOne({ where: { userId } });
        if (!subscription) throw new Error('No active subscription found');

        if (subscription.status !== 'active') {
            throw new Error(`Your subscription is ${subscription.status}. Please activate or renew it to proceed.`);
        }

        if (subscription.expiresAt && new Date(subscription.expiresAt) < new Date()) {
            throw new Error('Your subscription has expired. Please renew it to proceed.');
        }

        return subscription;
    }

    async checkProjectLimit(userId) {
        const subscription = await this.getActiveSubscription(userId);
        const plan = this.limits[subscription.planType] || this.limits.starter;
        
        const currentProjectCount = await Project.count({ where: { userId } });
        
        if (currentProjectCount >= plan.projects) {
            throw new Error(`Your current plan (${subscription.planType}) is limited to ${plan.projects} project(s). Please upgrade to create more.`);
        }

        return true;
    }

    async checkMessageLimit(userId, requestedCount = 1) {
        const subscription = await this.getActiveSubscription(userId);
        const plan = this.limits[subscription.planType] || this.limits.starter;

        if (plan.messagesPerMonth === Infinity) return true;

        // Calculate messages sent in the current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Find all projects for the user to count their messages
        const userProjects = await Project.findAll({ where: { userId }, attributes: ['id'] });
        const projectIds = userProjects.map(p => p.id);

        if (projectIds.length === 0) return true; // No projects, no messages

        const currentMonthMessages = await Message.count({
            where: {
                projectId: projectIds,
                createdAt: {
                    [Op.gte]: startOfMonth
                }
            }
        });

        if (currentMonthMessages + requestedCount > plan.messagesPerMonth) {
            throw new Error(`Monthly message limit reached. Your plan allows ${plan.messagesPerMonth} messages per month, and you have sent ${currentMonthMessages}.`);
        }

        return true;
    }
}

module.exports = new UsageService();
