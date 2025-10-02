import { Router } from 'express';
import redis from '../config/redisClient';

const router = Router();

router.get('/redis-test', async (req, res) => {
  if (!redis) return res.status(503).json({ error: 'Redis not available' });

  try {
    await redis.set('test_key', 'hello world');
    const value = await redis.get('test_key');
    res.json({ value });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
