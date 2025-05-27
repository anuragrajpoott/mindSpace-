import express from "express";
import {toggleLike,getLikesForPost} from "../controllers/likeController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Toggle like/unlike on a post (authenticated)
router.post("/:postId/toggle", authenticateUser, toggleLike);

// Optionally, get likes for a post (public)
router.get("/:postId", getLikesForPost);

export default router;
