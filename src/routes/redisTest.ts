import { Router } from "express";
import { createClient } from "redis";

const router = Router();

// Buat client Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Error handler Redis
redisClient.on("error", (err: unknown) => {
  console.error("Redis Client Error", err);
});

// Connect Redis (sekali saja)
(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis connected");
  }
})();

// 🔹 Test endpoint
router.get("/test", async (req, res) => {
  try {
    await redisClient.set("ping", "pong");
    const value = await redisClient.get("ping");
    res.json({ redis: value });
  } catch (err) {
    console.error("Redis test error:", err);
    res.status(500).json({ error: "Redis connection failed" });
  }
});

// 🔹 Ping endpoint
router.get("/ping", async (req, res) => {
  try {
    const result = await redisClient.ping();
    res.json({ ping: result });
  } catch (err) {
    console.error("Redis ping error:", err);
    res.status(500).json({ error: "Redis ping failed" });
  }
});

// 🔹 Get key
router.get("/:key", async (req, res) => {
  try {
    const value = await redisClient.get(req.params.key);
    if (value) {
      res.json({ key: req.params.key, value });
    } else {
      res.status(404).json({ error: "Key not found" });
    }
  } catch (err) {
    console.error("Redis get error:", err);
    res.status(500).json({ error: "Redis get failed" });
  }
});

// 🔹 Set key
router.post("/:key/:value", async (req, res) => {
  try {
    await redisClient.set(req.params.key, req.params.value);
    res.json({ message: "Key set successfully", key: req.params.key, value: req.params.value });
  } catch (err) {
    console.error("Redis set error:", err);
    res.status(500).json({ error: "Redis set failed" });
  }
});

// 🔹 Delete key
router.delete("/:key", async (req, res) => {
  try {
    const result = await redisClient.del(req.params.key);
    if (result > 0) {
      res.json({ message: "Key deleted", key: req.params.key });
    } else {
      res.status(404).json({ error: "Key not found" });
    }
  } catch (err) {
    console.error("Redis delete error:", err);
    res.status(500).json({ error: "Redis delete failed" });
  }
});

export default router;
