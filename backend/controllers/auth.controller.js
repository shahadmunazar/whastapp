const authService = require('../services/auth.service');

class AuthController {
    async register(req, res) {
        try {
            await authService.register(req.body);
            res.json({ status: true, message: 'User registered' });
        } catch (err) {
            res.status(400).json({ status: false, error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json({ status: true, ...result });
        } catch (err) {
            res.status(401).json({ status: false, message: err.message });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await authService.getProfile(req.user.id);
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const user = await authService.updateProfile(req.user.id, req.body);
            res.json({ status: true, user });
        } catch (err) {
            res.status(400).json({ status: false, error: err.message });
        }
    }

    async subscribe(req, res) {
        try {
            const subscription = await authService.subscribe(req.user.id, req.body);
            res.json({ status: true, subscription });
        } catch (err) {
            res.status(400).json({ status: false, error: err.message });
        }
    }
}

module.exports = new AuthController();
