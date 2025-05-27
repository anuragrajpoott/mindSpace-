const Notification = require("../models/Notification");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, type, message, relatedId } = req.body; 
    // relatedId can be a postId, commentId, or friend request ID, etc.

    const newNotification = await Notification.create({
      user: userId,
      type,
      message,
      relatedId,
      read: false,
    });

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating notification", error });
  }
};

// Get notifications for a user (optionally filtered by read/unread)
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications", error });
  }
};

// Mark notification(s) as read
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationIds } = req.body; // array of notification IDs to mark as read

    await Notification.updateMany(
      { _id: { $in: notificationIds }, user: userId },
      { $set: { read: true } }
    );

    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notifications", error });
  }
};

// Optionally delete notifications
exports.deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.params;

    await Notification.deleteOne({ _id: notificationId, user: userId });

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting notification", error });
  }
};
