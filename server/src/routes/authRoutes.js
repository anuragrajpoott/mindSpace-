import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  // refreshToken,
  forgotPassword,
  resetPassword,
  // verifyEmail,
  updatePassword,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/sign-up", registerUser);
router.post("/log-in", loginUser);
router.post("/logout", logoutUser);
// router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
// router.get("/verify-email/:token", verifyEmail);

// Protected routes
router.put("/update-password", authenticateUser, updatePassword);
router.get("/me", authenticateUser, getCurrentUser);

export default router;
