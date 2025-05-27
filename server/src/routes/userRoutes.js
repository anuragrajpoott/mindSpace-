const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middlewares/authmiddleware");

// Get user profile by ID (public)
router.get("/:id", userController.getUserProfile);

// Update own profile (authenticated)
router.put("/", authenticateUser, userController.updateUserProfile);

// Delete own account (authenticated)
router.delete("/", authenticateUser, userController.deleteUser);

// Get all users (optional: add admin middleware if needed)
router.get("/", authenticateUser, userController.getAllUsers);

module.exports = router;
