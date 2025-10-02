import { Router } from 'express';
import openai from '../config/openaiClient';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/chat', verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message?.content || '' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
