import express from "express";
import {
  getSupportResources,
} from "../controllers/supportResourceController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Support resources
router.get("/", authenticateUser, getSupportResources);

export default router;
