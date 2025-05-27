const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateUser = require("../middlewares/authmiddleware");

// Create a post (authenticated)
router.post("/", authenticateUser, postController.createPost);

// Get all posts (public)
router.get("/", postController.getAllPosts);

// Get post by ID (public)
router.get("/:id", postController.getPostById);

// Update post (authenticated)
router.put("/:id", authenticateUser, postController.updatePost);

// Delete post (authenticated)
router.delete("/:id", authenticateUser, postController.deletePost);

module.exports = router;
