const Notification = require("../models/Notification");

// ========== CREATE NOTIFICATION ==========
exports.createNotification = async (req, res) => {
  try {
    const { userId, type, message, relatedId } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newNotification = await Notification.create({
      user: userId,
      type,
      message,
      relatedId: relatedId || null,
      read: false,
    });

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    console.error("Create Notification Error:", error);
    res.status(500).json({ success: false, message: "Error creating notification", error: error.message });
  }
};

// ========== GET USER NOTIFICATIONS ==========
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ success: false, message: "Error fetching notifications", error: error.message });
  }
};

// ========== MARK NOTIFICATIONS AS READ ==========
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationIds } = req.body;

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({ success: false, message: "No notification IDs provided" });
    }

    await Notification.updateMany(
      { _id: { $in: notificationIds }, user: userId },
      { $set: { read: true } }
    );

    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    console.error("Mark Read Error:", error);
    res.status(500).json({ success: false, message: "Error updating notifications", error: error.message });
  }
};

// ========== DELETE NOTIFICATION ==========
exports.deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.params;

    const deleted = await Notification.findOneAndDelete({ _id: notificationId, user: userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Notification not found or already deleted" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ success: false, message: "Error deleting notification", error: error.message });
  }
};
