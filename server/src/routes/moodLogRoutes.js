import express from "express";
import {
  createMoodLog,          // create a new mood entry
  getMoodLogs,      // get all mood logs for user (with optional filters/pagination)
  getMoodStats,   // get a specific mood log by ID
  updateMoodLog,    // update mood entry (if allowed)
  deleteMoodLog     // delete mood entry
} from "../controllers/moodLogController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes are protected, since mood logs are personal data
router.post("/", authenticateUser, createMoodLog);
router.get("/", authenticateUser, getMoodLogs);
router.get("/mood-stats", authenticateUser, getMoodLogs);
router.put("/:id", authenticateUser, updateMoodLog);
router.delete("/:id", authenticateUser, deleteMoodLog);

export default router;
