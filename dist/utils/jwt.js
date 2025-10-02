"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET || 'secret';
const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: '7d' });
exports.signToken = signToken;
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    }
    catch (_a) {
        return null;
    }
};
exports.verifyToken = verifyToken;
