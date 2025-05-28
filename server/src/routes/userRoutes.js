import express from "express";
import {
  // registerUser,         // signup
  // loginUser,            // login
  // logoutUser,           // logout
  // refreshToken,         // refresh JWT token
  // forgotPassword,       // request password reset
  // resetPassword,        // reset password via token
  // verifyEmail,          // confirm email via token
  // updatePassword,       // change password (authenticated)
  // getCurrentUser,       // get logged-in user profile (authenticated)
  getUserProfile,       // get user profile by ID (public)
  updateUserProfile,    // update own profile (authenticated)
  deleteUser,           // delete own account (authenticated)
  getAllUsers           // list all users (authenticated, maybe admin)
} from "../controllers/userController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
// router.post("/sign-up", registerUser);
// router.post("/log-in", loginUser);
// router.post("/logout", logoutUser);
// router.post("/refresh-token", refreshToken);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.get("/verify-email/:token", verifyEmail);

// Protected routes (authenticated)
// router.get("/me", authenticateUser, getCurrentUser);
// router.put("/me/password", authenticateUser, updatePassword);
router.put("/me/profile", authenticateUser, updateUserProfile);
router.delete("/me", authenticateUser, deleteUser);

// Get user profile by user ID (public)
router.get("/:id", getUserProfile);

// List all users (authenticated, consider admin check)
router.get("/", authenticateUser, getAllUsers);

export default router;
