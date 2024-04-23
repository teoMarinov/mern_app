import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/User.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/auth/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.listen(5000, () => console.log("Server is running... port: 5000"));
