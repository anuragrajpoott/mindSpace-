import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configs
import dbConnect from "./src/configs/database.js";
import cdConnect from "./src/configs/cloudinary.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import friendRoutes from "./src/routes/friendRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import supportRoutes from "./src/routes/supportRoutes.js"; // if using Supportify+ support features

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace * with actual frontend URL in production
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// DB and Cloudinary
dbConnect();
cdConnect();

// Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/support", supportRoutes); // if using supportController

// Base route
app.get("/", (req, res) => {
  res.send(`<h4>🚀 Server running on PORT ${process.env.PORT}</h4>`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke!",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
