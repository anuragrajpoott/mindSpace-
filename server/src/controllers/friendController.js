const Message = require("../models/Message");
const User = require("../models/User");

// ====== FRIEND REQUESTS ======

exports.sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.body;

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient not found" });
    }

    if (recipient.friendRequests?.includes(senderId)) {
      return res.status(400).json({ success: false, message: "Friend request already sent" });
    }

    recipient.friendRequests.push(senderId);
    await recipient.save();

    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    console.error("Send Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Error sending friend request", error: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user.friendRequests?.includes(requesterId)) {
      return res.status(400).json({ success: false, message: "No friend request from this user" });
    }

    user.friends.push(requesterId);
    requester.friends.push(userId);

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);

    await user.save();
    await requester.save();

    res.status(200).json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    console.error("Accept Friend Request Error:", error);
    res.status(500).json({ success: false, message: "Error accepting friend request", error: error.message });
  }
};

exports.removeFriend = async (req, res) => {
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

// ====== MESSAGES ======

// exports.sendMessage = async (req, res) => {
//   try {
//     const senderId = req.user.id;
//     const { receiverId, content, media = null } = req.body;

//     if (!receiverId || !content) {
//       return res.status(400).json({ success: false, message: "Receiver and content are required" });
//     }

//     const newMessage = await Message.create({
//       sender: senderId,
//       receiver: receiverId,
//       content,
//       media,
//     });

//     res.status(201).json({ success: true, message: "Message sent", data: newMessage });
//   } catch (error) {
//     console.error("Send Message Error:", error);
//     res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
//   }
// };

// exports.getMessagesBetweenUsers = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { otherUserId } = req.params;

//     const messages = await Message.find({
//       $or: [
//         { sender: userId, receiver: otherUserId },
//         { sender: otherUserId, receiver: userId },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json({ success: true, messages });
//   } catch (error) {
//     console.error("Get Messages Error:", error);
//     res.status(500).json({ success: false, message: "Error retrieving messages", error: error.message });
//   }
// };
