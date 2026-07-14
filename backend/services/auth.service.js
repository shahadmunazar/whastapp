const { User, Subscription, Project } = require('../models');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(userData) {
        const { name, email, password, role } = userData;
        const user = await User.create({ name, email, password, role: role || 'user' });
        
        // Create default subscription with 30-day validity
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        
        await Subscription.create({
            userId: user.id,
            planType: 'starter',
            status: 'active',
            expiresAt: expiresAt
        });

        return user;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validPassword(password))) {
            throw new Error('Invalid credentials');
        }
        
        const subscription = await Subscription.findOne({ where: { userId: user.id } });

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );
        return { 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                plan: subscription ? subscription.planType : 'starter'
            } 
        };
    }

    async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return null;

        const subscription = await Subscription.findOne({ where: { userId } });
        const projectCount = await Project.count({ where: { userId } });
        
        return {
            ...user.toJSON(),
            plan: subscription ? subscription.planType : 'starter',
            planStatus: subscription ? subscription.status : 'active',
            planExpiresAt: subscription ? subscription.expiresAt : null,
            projectCount
        };
    }

    async updateProfile(userId, updateData) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        
        // Update allowed fields
        const allowedFields = ['name', 'phone', 'bio', 'location', 'website', 'avatar'];
        allowedFields.forEach(field => {
            if (updateData[field] !== undefined) {
                user[field] = updateData[field];
            }
        });

        await user.save();
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        return updatedUser;
    }

    async subscribe(userId, { planType, billingCycle, amount }) {
        const { Subscription, Payment } = require('../models');
        let subscription = await Subscription.findOne({ where: { userId } });
        
        if (!subscription) {
            subscription = await Subscription.create({ userId });
        }

        const expiresAt = new Date();
        if (billingCycle === 'yearly') {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else {
            expiresAt.setDate(expiresAt.getDate() + 30);
        }

        subscription.planType = planType;
        subscription.status = 'active';
        subscription.expiresAt = expiresAt;
        await subscription.save();

        // Create payment record if amount > 0
        if (amount && amount > 0) {
            const crypto = require('crypto');
            await Payment.create({
                userId,
                planType,
                amount,
                billingCycle,
                status: 'completed',
                transactionId: 'TXN_' + crypto.randomBytes(8).toString('hex').toUpperCase()
            });
        }

        return subscription;
    }
}

module.exports = new AuthService();
