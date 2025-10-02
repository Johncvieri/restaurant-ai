"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
// Login dummy (sementara hardcode)
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username !== "admin" || password !== "password") {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const payload = { id: 1, username: "admin", role: "admin" };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
exports.default = router;
