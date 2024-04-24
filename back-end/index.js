import express from "express";
import cors from "cors";
import "./db/config.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/postRoutes.js";

export const SERCRET_KEY =
  "JKHSDF7I3R2YIUOWEHF78I23HFI87OU23HF7832HF9732GFHO3U2YTGO78";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/post", protectedRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running...\nPort: ${PORT}`));
