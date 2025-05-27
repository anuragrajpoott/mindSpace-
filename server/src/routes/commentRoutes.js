const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticateUser = require("../middlewares/authmiddleware");

// Create a comment (authenticated)
router.post("/", authenticateUser, commentController.addComment);

// Get comments for a post (public)
router.get("/post/:postId", commentController.getCommentsByPost);

// Update comment (authenticated)
// router.put("/:id", authenticateUser, commentController.updateComment);

// Delete comment (authenticated)
router.delete("/:id", authenticateUser, commentController.deleteComment);

module.exports = router;
