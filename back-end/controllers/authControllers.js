import User from "../db/User.js";
import "../db/config.js";
import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../index.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Registration success" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, SERCRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      message: "Login success",
      userInfo: {
        name: user.name,
        email: user.email,
        userId: user._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const tokenLogin = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const userId = jwt.verify(token, SERCRET_KEY).userId;

  const user = await User.findOne({ _id: userId });

  res.status(200).json({
    message: "Login success",
    userInfo: {
      name: user.name,
      email: user.email,
      userId: user._id,
    },
    token,
  });
};
