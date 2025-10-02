import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Login dummy (sementara hardcode)
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const payload = { id: 1, username: "admin", role: "admin" };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

export default router;
