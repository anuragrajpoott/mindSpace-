import express from "express";
import {
  createSupportPost,
  getAllSupportPosts,
  getSupportPostById,
  updateSupportPost,
  deleteSupportPost,
  getSupportPostsByUser,
} from "../controllers/supportPostController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a support post (authenticated)
router.post("/", authenticateUser, createSupportPost);

// Get all support posts (public)
router.get("/", getAllSupportPosts);

// Get support post by ID (public)
router.get("/:id", getSupportPostById);

// Get support posts by user (public)
router.get("/user/:userId", getSupportPostsByUser);

// Update a support post (authenticated)
router.put("/:id", authenticateUser, updateSupportPost);

// Delete a support post (authenticated)
router.delete("/:id", authenticateUser, deleteSupportPost);

export default router;
