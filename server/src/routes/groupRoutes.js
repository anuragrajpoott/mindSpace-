import express from "express";
import {
  createGroup,
  getAllGroups,
  // getGroupById,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  getGroupMembers,
  // postInGroup,
  // searchGroups,
} from "../controllers/groupController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new group (authenticated)
router.post("/", authenticateUser, createGroup);

// Get all groups (public or authenticated)
router.get("/", getAllGroups);

// Search groups (public or authenticated)
// router.get("/search", searchGroups);

// Get a group by ID (public or authenticated)
// router.get("/:groupId", getGroupById);

// Update group (authenticated, admin/moderator)
router.put("/:groupId", authenticateUser, updateGroup);

// Delete group (authenticated, admin/moderator)
router.delete("/:groupId", authenticateUser, deleteGroup);

// Join a group (authenticated)
router.post("/:groupId/join", authenticateUser, joinGroup);

// Leave a group (authenticated)
router.post("/:groupId/leave", authenticateUser, leaveGroup);

// Get members of a group (authenticated or public)
router.get("/:groupId/members", getGroupMembers);

// Post inside a group (authenticated)
// router.post("/:groupId/post", authenticateUser, postInGroup);

export default router;
