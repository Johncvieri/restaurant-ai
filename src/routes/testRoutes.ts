import { Router, Request, Response, NextFunction } from "express";
import redis from "../config/redisClient";

const router = Router();

// Test Redis
router.get("/ping-redis", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pong = await redis.ping();
    return res.json({ redis: pong });
  } catch (err) {
    next(err);
  }
});

// Test server
router.get("/ping", (req: Request, res: Response) => {
  return res.json({ message: "pong", status: "ok" });
});

export default router;
