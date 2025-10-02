import { Router, Request, Response } from "express";
import supabase from "../config/supabaseClient";
import { verifyToken } from "../middleware/auth";
const router = Router();
router.get("/", verifyToken, async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("restaurants").select("*");
  if (error) return res.status(500).json({ error });
  res.json(data);
});
export default router;
