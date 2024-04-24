import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: { type: String, required: true },
  postIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      default: [],
    },
  ],
});

export default mongoose.model("users", userSchema);
