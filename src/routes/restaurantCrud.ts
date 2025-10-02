import { Router } from 'express';
import supabase from '../config/supabaseClient';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Example: Get all restaurants
router.get('/restaurants', verifyToken, async (req, res) => {
  const { data, error } = await supabase.from('restaurants').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

export default router;
