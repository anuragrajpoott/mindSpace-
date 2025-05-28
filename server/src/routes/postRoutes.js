import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  // getPostsByUser,
  // searchPosts,
  // getTrendingPosts,
} from "../controllers/postController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new post (authenticated)
router.post("/", authenticateUser, createPost);

// Get all posts (public)
router.get("/", getAllPosts);

// Get trending posts (public)
// router.get("/trending", getTrendingPosts);

// Search posts by content or tags (public)
// router.get("/search", searchPosts);

// Get posts by a specific user (public)
// router.get("/user/:userId", getPostsByUser);

// Get a post by ID (public)
router.get("/:id", getPostById);

// Update a post by ID (authenticated)
router.put("/:id", authenticateUser, updatePost);

// Delete a post by ID (authenticated)
router.delete("/:id", authenticateUser, deletePost);

export default router;
