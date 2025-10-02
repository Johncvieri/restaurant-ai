import dotenv from 'dotenv';
dotenv.config();

// Dummy Redis untuk development
class DummyRedis {
  private store: Record<string, string> = {};
  async set(key: string, value: string) { this.store[key] = value; return 'OK'; }
  async get(key: string) { return this.store[key] || null; }
}

export const redis = process.env.REDIS_URL && process.env.REDIS_URL.length > 0
  ? new (require('ioredis'))(process.env.REDIS_URL)
  : new DummyRedis();

console.log('Redis initialized (dummy or real)');
