import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  // likeComment,
  getCommentsByUser,
} from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a comment (authenticated)
router.post("/", authenticateUser, createComment);

// Get comments for a post (with pagination)
router.get("/post/:postId", getCommentsByPost);

// Update a comment (authenticated, user can edit own comment)
router.put("/:id", authenticateUser, updateComment);

// Delete a comment (authenticated, user or admin)
router.delete("/:id", authenticateUser, deleteComment);

// Toggle like on a comment (authenticated)
// router.post("/:id/like", authenticateUser, likeComment);

// Get all comments by a user (public or protected depending on use-case)
router.get("/user/:userId", getCommentsByUser);

export default router;
