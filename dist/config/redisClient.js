"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let redis = null;
if (process.env.REDIS_URL) {
    redis = new ioredis_1.default(process.env.REDIS_URL);
    redis.on('connect', () => console.log('✅ Connected to Redis'));
    redis.on('error', (err) => console.error('Redis error:', err));
}
else {
    console.log('⚠️ REDIS_URL not set. Redis is disabled.');
}
exports.default = redis;
