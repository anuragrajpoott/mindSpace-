import express from "express";
import {addComment,getCommentsByPost,deleteComment} from "../controllers/commentController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a comment (authenticated)
router.post("/", authenticateUser, addComment);

// Get comments for a post (public)
router.get("/post/:postId", getCommentsByPost);

// Update comment (authenticated)
// router.put("/:id", authenticateUser, updateComment); // Uncomment if needed

// Delete comment (authenticated)
router.delete("/:id", authenticateUser, deleteComment);

export default router;
