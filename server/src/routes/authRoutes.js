import express from "express";
import {signUp,logIn,sendOtp,search} from "../controllers/authController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/sign-up", signUp);
router.post("/log-in", logIn);
router.get("/send-otp", sendOtp);

// Protected route example: search users
router.get("/search", authenticateUser, search);

export default router;
