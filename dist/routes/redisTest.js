"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const router = (0, express_1.Router)();
router.get('/redis-test', async (req, res) => {
    if (!redisClient_1.default)
        return res.status(503).json({ error: 'Redis not available' });
    try {
        await redisClient_1.default.set('test_key', 'hello world');
        const value = await redisClient_1.default.get('test_key');
        res.json({ value });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
