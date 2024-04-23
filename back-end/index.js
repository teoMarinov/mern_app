import express from "express";
import cors from "cors";
import "./db/config.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running...\nPort: ${PORT}`));
