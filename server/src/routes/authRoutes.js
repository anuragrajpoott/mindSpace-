const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../middlewares/authmiddleware");


// Public routes
router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.get("/send-otp", authController.sendOtp);
router.get("/", authenticateUser, authController.search);

module.exports = router;
