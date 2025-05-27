const Message = require("../models/Message");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { mailSender } = require("../utils/mailSender");

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || (!content && !req.files?.media)) {
      return res.status(400).json({ success: false, message: "Receiver and content or media required" });
    }

    // Upload media to Cloudinary if exists
    let mediaUrl = null;
    if (req.files?.media) {
      const file = req.files.media;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "SupportifyPlus/Messages",
        resource_type: "auto",
        quality: "auto",
      });
      mediaUrl = uploadResult.secure_url;
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
      media: mediaUrl,
    });

    // Send notification email to receiver
    const receiver = await User.findById(receiverId);
    if (receiver?.email) {
      await mailSender(
        receiver.email,
        "New Message Received",
        `<p>You have received a new message from a user on Supportify+.</p>
         <p>Message preview: ${content ? content.substring(0, 100) : '[Media message]'}</p>`
      );
    }

    res.status(201).json({ success: true, message: "Message sent", data: message });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
};

// Get all messages between two users
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    res.status(500).json({ success: false, message: "Error fetching messages", error: error.message });
  }
};

// Mark a message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ success: true, message: "Message marked as read" });
  } catch (error) {
    console.error("Mark as Read Error:", error);
    res.status(500).json({ success: false, message: "Error marking as read", error: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    if (message.sender.toString() !== userId && message.receiver.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete Message Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete message", error: error.message });
  }
};
