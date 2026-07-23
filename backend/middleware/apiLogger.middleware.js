const { ApiLog } = require('../models');

const apiLogger = async (req, res, next) => {
    // Capture request start time
    const startTime = Date.now();

    // Store original send function
    const originalSend = res.send;

    // Override send to intercept response payload and status
    res.send = function (body) {
        // Restore original send to prevent loops
        res.send = originalSend;

        // Wait slightly to ensure route handlers have populated req.user if auth middleware was used
        setTimeout(async () => {
            try {
                const userId = req.user ? req.user.id : null;
                const projectId = req.user && req.user.projectId ? req.user.projectId : null;

                // Do not log the GET /api/logs endpoint to prevent huge nested payloads
                if (req.url.includes('/api/logs') && req.method === 'GET') {
                    return;
                }

                if (userId) {
                    await ApiLog.create({
                        userId,
                        projectId,
                        endpoint: req.originalUrl || req.url,
                        method: req.method,
                        payload: req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : null,
                        responseStatus: res.statusCode,
                        responsePayload: body ? String(body).substring(0, 1000) : null, // Limit response payload length
                        ipAddress: req.ip || req.connection.remoteAddress
                    });
                }
            } catch (err) {
                console.error('Error logging API request:', err);
            }
        }, 0);



        // Send the response
        return originalSend.call(this, body);
    };

    next();
};

module.exports = apiLogger;
