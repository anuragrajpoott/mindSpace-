import express from "express";
import {
  createSupportResource,
  getAllSupportResources,
  getSupportResourceById,
  updateSupportResource,
  deleteSupportResource,
  searchSupportResources,
  getSupportResourcesByCategory,
} from "../controllers/supportResourceController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a support resource (authenticated)
router.post("/", authenticateUser, createSupportResource);

// Get all support resources (public)
router.get("/", getAllSupportResources);

// Get support resource by ID (public)
router.get("/:id", getSupportResourceById);

// Get support resources by category (public)
router.get("/category/:category", getSupportResourcesByCategory);

// Search support resources by keyword (public)
router.get("/search/:keyword", searchSupportResources);

// Update a support resource (authenticated)
router.put("/:id", authenticateUser, updateSupportResource);

// Delete a support resource (authenticated)
router.delete("/:id", authenticateUser, deleteSupportResource);

export default router;
