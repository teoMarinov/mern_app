import jwt from "jsonwebtoken";
import { SERCRET_KEY } from "../index.js";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, SERCRET_KEY);
    req.senderId = decoded.userId
  
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
};

export default verifyToken;
