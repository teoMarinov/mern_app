import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  postIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      default: [],
    },
  ],
});

export default mongoose.model("users", userSchema);
