import User from "../db/User.js";
import Post from "../db/Post.js";
import "../db/config.js";
import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../index.js";
import mongoose from "mongoose";

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
  const creatorId = req.senderId;

  const { title, body } = req.body;
  const newPost = new Post({
    title,
    body,
    creatorId,
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

export const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ creatorId: userId }).populate(
      "creatorId",
      "name"
    );

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

export const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const { senderId } = req;
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.creatorId.toString() !== senderId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }
    await Post.findByIdAndDelete({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const { senderId } = req;
    const { title, body } = req.body;
    let post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.creatorId.toString() !== senderId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    title &&
      (post = await Post.findByIdAndUpdate(postId, { title }, { new: true }));
    body &&
      (post = await Post.findByIdAndUpdate(postId, { body }, { new: true }));
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update the post" });
  }
};

export const likePost = async (req, res) => {
  const { senderId } = req;
  const { postId } = req.params;
  const post = await Post.findById({ _id: postId });
  const isLiked = post.likedBy.indexOf(senderId);
  const isDisliked = post.dislikedBy.indexOf(senderId);
  if (isLiked == -1) {
    await Post.findByIdAndUpdate(
      postId,
      { $push: { likedBy: senderId }, $inc: { likes: 1 } },
      { new: true }
    );
  } else {
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likedBy: senderId }, $inc: { likes: -1 } },
      { new: true }
    );
  }
  if (isDisliked >= 0) {
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { dislikedBy: senderId }, $inc: { dislikes: -1 } },
      { new: true }
    );
  }
  const updatedPost = await Post.findById(postId);
  res.status(200).json(updatedPost);
};

export const dislikePost = async (req, res) => {
  const { senderId } = req;
  const { postId } = req.params;
  const post = await Post.findById({ _id: postId });
  const isLiked = post.likedBy.indexOf(senderId);
  const isDisliked = post.dislikedBy.indexOf(senderId);
  if (isDisliked == -1) {
    await Post.findByIdAndUpdate(
      postId,
      { $push: { dislikedBy: senderId }, $inc: { dislikes: 1 } },
      { new: true }
    );
  } else {
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { dislikedBy: senderId }, $inc: { dislikes: -1 } },
      { new: true }
    );
  }
  if (isLiked >= 0) {
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likedBy: senderId }, $inc: { likes: -1 } },
      { new: true }
    );
  }
  const updatedPost = await Post.findById(postId);
  res.status(200).json(updatedPost);
};
