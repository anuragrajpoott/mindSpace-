import express from "express";
import {
  // likePost,
  // unlikePost,
  // likeComment,
  // unlikeComment,
  // getLikesByUser,
  toggleLike,
  isLikedByUser,
  getLikesForTarget
} from "../controllers/likeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Like a post (authenticated)
// router.post("/post/:postId/like", authenticateUser, likePost);

// Unlike a post (authenticated)
// router.post("/post/:postId/unlike", authenticateUser, unlikePost);

// // Like a comment (authenticated)
// router.post("/comment/:commentId/like", authenticateUser, likeComment);

// Unlike a comment (authenticated)
// router.post("/comment/:commentId/unlike", authenticateUser, unlikeComment);

// Get all likes by a user (authenticated)
// router.get("/user/:userId", authenticateUser, getLikesByUser);

router.post("/post/:postId",authenticateUser,toggleLike)

router.get("/user/:userId",authenticateUser,isLikedByUser)

router.get("/post/:postId",authenticateUser,getLikesForTarget)

export default router;
