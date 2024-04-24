import express from "express";
import "../db/config.js";
import { createPost } from "../controllers/postController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-posts");

router.post("/new-post", createPost);

export default router;
