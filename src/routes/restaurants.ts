import { Router, Request, Response, NextFunction } from "express";
import redis from "../config/redisClient";
import supabase from "../config/supabaseClient";
import { verifyToken } from "../middleware/auth";
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

router.use(verifyToken);

// Cached restaurant list
router.get("/restaurants-cache", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = "restaurants_cache";
    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const { data, error } = await supabase.from("restaurants").select("*");
    if (error) throw error;

    await redis.set(cacheKey, JSON.stringify(data), "EX", 60); // cache 1 menit
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
