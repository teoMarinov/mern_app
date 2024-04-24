import User from "../db/User.js";
import Post from "../db/Post.js";
import "../db/config.js";
import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../index.js";

export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find().populate("creatorId", "name");

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      body: post.body,
      likes: post.likes,
      dislikes: post.dislikes,
      creator: {
        _id: post.creatorId._id,
        name: post.creatorId.name,
      },
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

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
  res.status(200).json({
    message: "Post created successfully",
    post: {
      title: savedPost.title,
      body: savedPost.body,
      likes: savedPost.likes,
      dislikes: savedPost.dislikes,
      id: savedPost._id,
      creatorId: savedPost.creatorId,
    },
  });
};
