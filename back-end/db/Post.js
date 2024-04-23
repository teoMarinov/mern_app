import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  likes: Number,
  dislikes: Number,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("posts", postSchema);
