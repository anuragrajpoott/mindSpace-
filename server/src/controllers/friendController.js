// src/controllers/friendController.js
import User from "../models/User.js";

// ====== FRIEND REQUESTS ======

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.body;

    if (senderId === recipientId) {
      return res.status(400).json({ success: false, message: "Cannot send friend request to yourself" });
    }

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient not found" });
    }

    if (recipient.friendRequests?.includes(senderId)) {
      return res.status(400).json({ success: false, message: "Friend request already sent" });
    }

    if (recipient.friends?.includes(senderId)) {
      return res.status(400).json({ success: false, message: "User is already your friend" });
    }

    recipient.friendRequests.push(senderId);
    await recipient.save();

    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    console.error("Send Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Error sending friend request", error: error.message });
  }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user.friendRequests?.includes(requesterId)) {
      return res.status(400).json({ success: false, message: "No friend request from this user" });
    }

    if (user.friends.includes(requesterId)) {
      return res.status(400).json({ success: false, message: "User is already your friend" });
    }

    user.friends.push(requesterId);
    requester.friends.push(userId);

    // Remove the friend request after accepting
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);

    await user.save();
    await requester.save();

    res.status(200).json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    console.error("Accept Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Error accepting friend request", error: error.message });
  }
};

// Remove friend
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ success: false, message: "You are not friends" });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    console.error("Remove Friend Error:", error);
    res.status(500).json({ success: false, message: "Error removing friend", error: error.message });
  }
};
