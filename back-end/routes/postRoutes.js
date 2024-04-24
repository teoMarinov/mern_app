import express from "express";
import "../db/config.js";
import { createPost, getAllPosts } from "../controllers/postController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);

router.post("/new-post", verifyToken, createPost);

export default router;
