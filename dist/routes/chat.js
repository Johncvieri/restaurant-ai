"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openaiClient_1 = __importDefault(require("../config/openaiClient"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/chat', auth_1.verifyToken, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message)
            return res.status(400).json({ error: 'Message is required' });
        const response = await openaiClient_1.default.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: message }],
        });
        res.json({ reply: response.choices[0].message?.content || '' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
