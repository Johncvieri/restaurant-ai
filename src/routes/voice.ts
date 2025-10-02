import { Router } from "express";
import multer from "multer";
import fs from "fs";
import openai from "../config/openaiClient";
import redis from "../config/redisClient";
import supabase from "../config/supabaseClient";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("audio"), async (req, res) => {
  const userId = req.body.userId || "guest";
  if (!req.file) return res.status(400).json({ error: "Audio file required" });

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    const text = transcription.text;

    // Simpan ke Redis
    await redis.set(`voice:${userId}`, text);

    // Simpan ke Supabase
    await supabase.from("voice_logs").insert([{ user_id: userId, text }]);

    fs.unlinkSync(req.file.path);
    res.json({ text });
  } catch (err) {
    console.error("Voice error:", err);
    res.status(500).json({ error: "Voice transcription failed" });
  }
});

export default router;
