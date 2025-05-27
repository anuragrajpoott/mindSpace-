import express from "express";
import {getAllUsers,getUserProfile,deleteUser,updateUserProfile} from "../controllers/userController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get user profile by ID (public)
router.get("/:id", getUserProfile);

// Update own profile (authenticated)
router.put("/", authenticateUser, updateUserProfile);

// Delete own account (authenticated)
router.delete("/", authenticateUser, deleteUser);

// Get all users (authenticated, consider admin middleware if needed)
router.get("/", authenticateUser, getAllUsers);

export default router;
