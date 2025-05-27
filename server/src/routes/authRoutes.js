import express from "express";
import {signUp,logIn,sendOtp,search} from "../controllers/authController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/send-otp", sendOtp);

// Protected route example: search users
router.get("/search", authenticateUser, search);

export default router;
