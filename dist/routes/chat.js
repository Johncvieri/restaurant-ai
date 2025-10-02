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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openaiClient_1 = __importDefault(require("../config/openaiClient"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
const supabaseClient_1 = __importDefault(require("../config/supabaseClient"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message, userId = "guest" } = req.body;
    if (!message)
        return res.status(400).json({ error: "Message required" });
    try {
        // 1️⃣ ChatGPT response
        const response = yield openaiClient_1.default.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
        });
        const reply = ((_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "";
        // 2️⃣ Simpan di Redis (cache sementara)
        yield redisClient_1.default.set(`chat:${userId}`, reply);
        // 3️⃣ Simpan di Supabase (permanen)
        yield supabaseClient_1.default.from("chats").insert([{ user_id: userId, message, reply }]);
        res.json({ reply });
    }
    catch (err) {
        console.error("Chat error:", err);
        res.status(500).json({ error: "Chat failed" });
    }
}));
exports.default = router;
