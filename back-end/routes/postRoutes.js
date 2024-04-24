import express from "express";
import "../db/config.js";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostsByUserId,
  updatePostById,
} from "../controllers/postController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);

router.post("/new-post", verifyToken, createPost);

router.get("/:userId", getPostsByUserId);

router.delete("/:postId", verifyToken, deletePostById);

router.put("/:postId", verifyToken, updatePostById);

export default router;
