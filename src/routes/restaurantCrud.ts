import { Router, Request, Response, NextFunction } from "express";
import supabase from "../config/supabaseClient";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.use(verifyToken);

// Create restaurant
router.post("/restaurants", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabase.from("restaurants").insert([{ name, description }]);

    if (error) throw error;
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

// Get restaurants
router.get("/restaurants", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabase.from("restaurants").select("*");

    if (error) throw error;
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
