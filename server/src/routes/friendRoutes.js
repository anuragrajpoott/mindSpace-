const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");
const authenticateUser = require("../middlewares/authmiddleware");

// Send friend request (authenticated)
router.post("/request/:userId", authenticateUser, friendController.sendFriendRequest);

// Accept friend request (authenticated)
router.put("/accept/:requestId", authenticateUser, friendController.acceptFriendRequest);

router.put("/friend/:requestId", authenticateUser, friendController.removeFriend);

// Decline friend request (authenticated)
// router.put("/decline/:requestId", authenticateUser, friendController.declineFriendRequest);

// // Get friend list (authenticated)
// router.get("/", authenticateUser, friendController.getFriendsList);

module.exports = router;
