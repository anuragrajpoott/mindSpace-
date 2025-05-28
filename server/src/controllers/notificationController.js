import Notification from "../models/Notification.js";

// ========== CREATE NOTIFICATION ==========
export const createNotification = async (req, res) => {
  try {
    const { recipientId, type, message, referenceId } = req.body;
    const senderId = req.user.id;

    if (!recipientId || !type || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newNotification = await Notification.create({
      sender: senderId,
      recipient: recipientId,
      type,
      message,
      reference: referenceId || null,
    });

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    console.error("Create Notification Error:", error);
    res.status(500).json({ success: false, message: "Failed to create notification" });
  }
};

// ========== GET USER NOTIFICATIONS ==========
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "userName profileImage");

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

// ========== MARK NOTIFICATION AS READ ==========
export const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Mark As Read Error:", error);
    res.status(500).json({ success: false, message: "Failed to update notification" });
  }
};

// ========== MARK ALL NOTIFICATIONS AS READ ==========
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany({ recipient: userId, read: false }, { read: true });

    res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("Mark All As Read Error:", error);
    res.status(500).json({ success: false, message: "Failed to mark all as read" });
  }
};

// ========== DELETE A NOTIFICATION ==========
export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;

    const notification = await Notification.findById(notificationId);

    if (!notification || notification.recipient.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized or not found" });
    }

    await notification.deleteOne();

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
};
