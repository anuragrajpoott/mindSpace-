import express from "express";
import {

  logMood,

} from "../controllers/moodLogController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Mood logging
router.post("/", authenticateUser, logMood);


export default router;
