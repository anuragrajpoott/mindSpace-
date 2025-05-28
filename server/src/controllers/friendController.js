import User from "../models/User.js";

// ========== SEND FRIEND REQUEST ==========
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    if (!receiverId || senderId === receiverId) {
      return res.status(400).json({ success: false, message: "Invalid user IDs." });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found." });
    }

    if (
      receiver.friendRequests.includes(senderId) ||
      receiver.friends.includes(senderId)
    ) {
      return res.status(400).json({ success: false, message: "Already sent or already friends." });
    }

    receiver.friendRequests.push(senderId);
    await receiver.save();

    res.status(200).json({ success: true, message: "Friend request sent." });
  } catch (error) {
    console.error("Send Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Failed to send friend request", error: error.message });
  }
};

// ========== ACCEPT FRIEND REQUEST ==========
export const acceptFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const { senderId } = req.body;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ success: false, message: "Users not found." });
    }

    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ success: false, message: "No friend request from this user." });
    }

    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
    await receiver.save();
    await sender.save();

    res.status(200).json({ success: true, message: "Friend request accepted." });
  } catch (error) {
    console.error("Accept Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Failed to accept friend request", error: error.message });
  }
};

// ========== REJECT FRIEND REQUEST ==========
export const rejectFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const { senderId } = req.body;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found." });
    }

    receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
    await receiver.save();

    res.status(200).json({ success: true, message: "Friend request rejected." });
  } catch (error) {
    console.error("Reject Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Failed to reject friend request", error: error.message });
  }
};

// ========== REMOVE FRIEND ==========
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ success: false, message: "User or friend not found." });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ success: true, message: "Friend removed." });
  } catch (error) {
    console.error("Remove Friend Error:", error);
    res.status(500).json({ success: false, message: "Failed to remove friend", error: error.message });
  }
};

// ========== GET FRIENDS LIST ==========
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", "userName profileImage");
    res.status(200).json({ success: true, friends: user.friends });
  } catch (error) {
    console.error("Get Friends Error:", error);
    res.status(500).json({ success: false, message: "Failed to get friends list", error: error.message });
  }
};

// ========== GET PENDING FRIEND REQUESTS ==========
export const getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friendRequests", "userName profileImage");
    res.status(200).json({ success: true, requests: user.friendRequests });
  } catch (error) {
    console.error("Get Pending Requests Error:", error);
    res.status(500).json({ success: false, message: "Failed to get friend requests", error: error.message });
  }
};
