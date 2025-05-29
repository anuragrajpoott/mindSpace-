import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import helmet from "helmet";

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import DB and Cloudinary configs
import dbConnect from "./src/configs/database.js";
import cdConnect from "./src/configs/cloudinary.js";

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import friendRoutes from "./src/routes/friendRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import supportResourceRoutes from "./src/routes/supportResourceRoutes.js";
import supportPostRoutes from "./src/routes/supportPostRoutes.js";
import moodLogRoutes from "./src/routes/moodLogRoutes.js";
import groupRoutes from "./src/routes/groupRoutes.js";

const app = express();

// Middleware setup
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logger for dev

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:  "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect DB and Cloudinary
dbConnect();
cdConnect();

// Mount all routes with RESTful and consistent naming

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/support-resources", supportResourceRoutes); // plural for REST convention
app.use("/api/v1/support-posts", supportPostRoutes);
app.use("/api/v1/mood-logs", moodLogRoutes);
app.use("/api/v1/groups", groupRoutes);

// Base route health check
app.get("/", (req, res) => {
  res.send(`<h4>🚀 Server running on PORT ${process.env.PORT || 5000}</h4>`);
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
