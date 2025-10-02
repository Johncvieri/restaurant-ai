import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecretKey123!';

export const signToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
export const verifyToken = (token: string) => {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
};
