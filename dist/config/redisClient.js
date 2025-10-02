"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Dummy Redis untuk development
class DummyRedis {
    constructor() {
        this.store = {};
    }
    async set(key, value) { this.store[key] = value; return 'OK'; }
    async get(key) { return this.store[key] || null; }
}
exports.redis = process.env.REDIS_URL && process.env.REDIS_URL.length > 0
    ? new (require('ioredis'))(process.env.REDIS_URL)
    : new DummyRedis();
console.log('Redis initialized (dummy or real)');
