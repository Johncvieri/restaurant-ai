"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabaseClient_1 = __importDefault(require("../config/supabaseClient"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.verifyToken, async (req, res) => {
    const { data, error } = await supabaseClient_1.default.from("restaurants").select("*");
    if (error)
        return res.status(500).json({ error });
    res.json(data);
});
exports.default = router;
