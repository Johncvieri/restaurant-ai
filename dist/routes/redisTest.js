"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redis_1 = require("redis");
const router = (0, express_1.Router)();
// Buat client Redis
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
// Error handler Redis
redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});
// Connect Redis (sekali saja)
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!redisClient.isOpen) {
        yield redisClient.connect();
        console.log("✅ Redis connected");
    }
}))();
// 🔹 Test endpoint
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set("ping", "pong");
        const value = yield redisClient.get("ping");
        res.json({ redis: value });
    }
    catch (err) {
        console.error("Redis test error:", err);
        res.status(500).json({ error: "Redis connection failed" });
    }
}));
// 🔹 Ping endpoint
router.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield redisClient.ping();
        res.json({ ping: result });
    }
    catch (err) {
        console.error("Redis ping error:", err);
        res.status(500).json({ error: "Redis ping failed" });
    }
}));
// 🔹 Get key
router.get("/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield redisClient.get(req.params.key);
        if (value) {
            res.json({ key: req.params.key, value });
        }
        else {
            res.status(404).json({ error: "Key not found" });
        }
    }
    catch (err) {
        console.error("Redis get error:", err);
        res.status(500).json({ error: "Redis get failed" });
    }
}));
// 🔹 Set key
router.post("/:key/:value", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set(req.params.key, req.params.value);
        res.json({ message: "Key set successfully", key: req.params.key, value: req.params.value });
    }
    catch (err) {
        console.error("Redis set error:", err);
        res.status(500).json({ error: "Redis set failed" });
    }
}));
// 🔹 Delete key
router.delete("/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield redisClient.del(req.params.key);
        if (result > 0) {
            res.json({ message: "Key deleted", key: req.params.key });
        }
        else {
            res.status(404).json({ error: "Key not found" });
        }
    }
    catch (err) {
        console.error("Redis delete error:", err);
        res.status(500).json({ error: "Redis delete failed" });
    }
}));
exports.default = router;
