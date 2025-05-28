import Message from "../models/Message.js";
import User from "../models/User.js";

// ========== SEND MESSAGE ==========
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !text) {
      return res.status(400).json({ success: false, message: "Receiver ID and message text are required." });
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    res.status(201).json({ success: true, message: "Message sent successfully", messageData: newMessage });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
};

// ========== GET MESSAGES BETWEEN USERS ==========
export const getMessagesWithUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages." });
  }
};

// ========== GET RECENT CONVERSATIONS ==========
export const getRecentConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "userName profileImage")
      .populate("receiver", "userName profileImage");

    const uniqueConversations = new Map();

    messages.forEach((msg) => {
      const key =
        msg.sender._id.toString() === userId
          ? msg.receiver._id.toString()
          : msg.sender._id.toString();
      if (!uniqueConversations.has(key)) {
        uniqueConversations.set(key, msg);
      }
    });

    const recentConversations = Array.from(uniqueConversations.values());

    res.status(200).json({ success: true, conversations: recentConversations });
  } catch (error) {
    console.error("Get Conversations Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch conversations." });
  }
};

// ========== DELETE A MESSAGE ==========
export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.user.id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }

    if (message.sender.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this message." });
    }

    await message.deleteOne();

    res.status(200).json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("Delete Message Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete message." });
  }
};
