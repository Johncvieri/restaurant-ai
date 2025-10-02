"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const supabaseClient_1 = __importDefault(require("../config/supabaseClient"));
const auth_1 = require("../middleware/auth");
const openai_1 = __importDefault(require("openai"));
const router = (0, express_1.Router)();
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY || "" });
router.use(auth_1.verifyToken);
// Cached restaurant list
router.get("/restaurants-cache", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = "restaurants_cache";
        const cached = yield redisClient_1.default.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        const { data, error } = yield supabaseClient_1.default.from("restaurants").select("*");
        if (error)
            throw error;
        yield redisClient_1.default.set(cacheKey, JSON.stringify(data), "EX", 60); // cache 1 menit
        return res.json(data);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
