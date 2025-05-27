const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authenticateUser = require("../middlewares/authmiddleware");

// Toggle like/unlike on a post (authenticated)
router.post("/:postId/toggle", authenticateUser, likeController.toggleLike);

// Optionally, get likes for a post (public)
// router.get("/:postId", likeController.getLikesForPost);

module.exports = router;
