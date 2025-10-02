import { Router } from "express";
import openai from "../config/openaiClient";
import redis from "../config/redisClient";
import supabase from "../config/supabaseClient";

const router = Router();

router.post("/", async (req, res) => {
  const { message, userId = "guest" } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    // 1️⃣ ChatGPT response
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    const reply = response.choices[0].message?.content || "";

    // 2️⃣ Simpan di Redis (cache sementara)
    await redis.set(`chat:${userId}`, reply);

    // 3️⃣ Simpan di Supabase (permanen)
    await supabase.from("chats").insert([{ user_id: userId, message, reply }]);

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;
