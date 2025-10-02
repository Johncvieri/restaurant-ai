import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

let redis: Redis.Redis | null = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
  redis.on('connect', () => console.log('✅ Connected to Redis'));
  redis.on('error', (err) => console.error('Redis error:', err));
} else {
  console.log('⚠️ REDIS_URL not set. Redis is disabled.');
}

export default redis;
