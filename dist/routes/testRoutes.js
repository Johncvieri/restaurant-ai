"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const router = (0, express_1.Router)();
// Test Redis
router.get("/ping-redis", async (req, res, next) => {
    try {
        const pong = await redisClient_1.default.ping();
        return res.json({ redis: pong });
    }
    catch (err) {
        next(err);
    }
});
// Test server
router.get("/ping", (req, res) => {
    return res.json({ message: "pong", status: "ok" });
});
exports.default = router;
