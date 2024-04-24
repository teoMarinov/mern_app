import express from "express";
import "../db/config.js";
import { createUser, loginUser } from "../controllers/authControllers.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default router;
