import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecretKey123!';

// JWT test
router.get('/jwt', (req, res) => {
  const token = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: '1h' });
  const payload = jwt.verify(token, JWT_SECRET);
  res.json({ token, payload });
});

// Redis dummy test
router.get('/redis', (req, res) => {
  res.json({ value: "Hello Redis (dummy)" });
});

export default router;
