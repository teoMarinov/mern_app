import express from "express";
import "../db/config.js";
import { createUser, loginUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

export default router;
