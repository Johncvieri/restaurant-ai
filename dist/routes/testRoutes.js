"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const redisClient_1 = require("../config/redisClient");
const router = (0, express_1.Router)();
// JWT test
router.get('/jwt', (req, res) => {
    const token = (0, jwt_1.signToken)({ userId: 1 });
    const payload = (0, jwt_1.verifyToken)(token);
    res.json({ token, payload });
});
// Redis test
router.get('/redis', async (req, res) => {
    try {
        await redisClient_1.redis?.set('test-key', 'Hello Redis');
        const value = await redisClient_1.redis?.get('test-key');
        res.json({ value });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.default = router;
