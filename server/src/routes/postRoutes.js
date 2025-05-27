import express from "express";
import {createPost,getAllPosts,getPostById,updatePost,deletePost} from "../controllers/postController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a post (authenticated)
router.post("/", authenticateUser, createPost);

// Get all posts (public)
router.get("/", getAllPosts);

// Get post by ID (public)
router.get("/:id", getPostById);

// Update post (authenticated)
router.put("/:id", authenticateUser, updatePost);

// Delete post (authenticated)
router.delete("/:id", authenticateUser, deletePost);

export default router;
