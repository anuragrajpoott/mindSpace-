import express from "express";
import {
  getGroups,
  toggleJoinGroup,
  getSupportPosts,
  createSupportPost,
  logMood,
  getSupportResources,
} from "../controllers/supportController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Groups routes
router.get("/groups", authenticateUser, getGroups);
router.post("/groups/:id/join", authenticateUser, toggleJoinGroup); // POST for join/leave toggle

// Support posts routes
router.get("/support-posts", authenticateUser, getSupportPosts);
router.post("/support-posts", authenticateUser, createSupportPost);

// Mood logging
router.post("/mood", authenticateUser, logMood);

// Support resources
router.get("/resources", authenticateUser, getSupportResources);

export default router;
