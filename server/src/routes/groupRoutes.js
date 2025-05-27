import express from "express";
import {
  getGroups,
  toggleJoinGroup,
} from "../controllers/groupController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Groups routes
router.get("/", authenticateUser, getGroups);
router.post("/join/:id", authenticateUser, toggleJoinGroup); // POST for join/leave toggle


export default router;
