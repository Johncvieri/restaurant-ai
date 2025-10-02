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
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const openaiClient_1 = __importDefault(require("../config/openaiClient"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
const supabaseClient_1 = __importDefault(require("../config/supabaseClient"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("audio"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId || "guest";
    if (!req.file)
        return res.status(400).json({ error: "Audio file required" });
    try {
        const transcription = yield openaiClient_1.default.audio.transcriptions.create({
            file: fs_1.default.createReadStream(req.file.path),
            model: "whisper-1",
        });
        const text = transcription.text;
        // Simpan ke Redis
        yield redisClient_1.default.set(`voice:${userId}`, text);
        // Simpan ke Supabase
        yield supabaseClient_1.default.from("voice_logs").insert([{ user_id: userId, text }]);
        fs_1.default.unlinkSync(req.file.path);
        res.json({ text });
    }
    catch (err) {
        console.error("Voice error:", err);
        res.status(500).json({ error: "Voice transcription failed" });
    }
}));
exports.default = router;
