import User from "../db/User.js";
import Post from "../db/Post.js";
import "../db/config.js";
import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../index.js";
import bcrypt from "bcrypt";

export const createPost = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decoded = jwt.verify(token, SERCRET_KEY).userId;

  const { title, body } = req.body;
  const newPost = new Post({
    title,
    body,
    creatorId: decoded,
  });
  const savedPost = await newPost.save();
  res
    .status(200)
    .json({ message: "Post created successfully", post: savedPost });
};
