import express from "express";
import "../db/config.js";
import {
  createUser,
  loginUser,
  tokenLogin,
} from "../controllers/authControllers.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/persistentLogin", verifyToken, tokenLogin);

export default router;
