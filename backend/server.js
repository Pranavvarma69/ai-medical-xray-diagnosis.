import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
dotenv.config();

const app = express();

app.use(cors());                 
app.use(express.json()); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 SERVE UPLOADED IMAGES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));        


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scans", scanRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(13000, () => {
      console.log("Server running on port 13000");
    });
  })
  .catch((err) => {
    console.error("DB error:", err);
  });