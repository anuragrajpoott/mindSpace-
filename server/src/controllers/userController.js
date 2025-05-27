import User from "../models/User.js";
import {uploadImageToCloudinary} from "../utils/fileUpload.js";
// import { mailSender } from "../utils/mailSender.js"; // Uncomment if using email notifications

// ========== GET USER PROFILE BY ID ==========
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate([
        { path: "posts", select: "_id content createdAt" },
        { path: "likes", select: "_id" },
        { path: "comments", select: "_id text" },
        { path: "friends", select: "_id userName profileImage" },
      ]);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== UPDATE USER PROFILE ==========
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const allowedFields = ["firstName", "lastName", "email", "phoneNo", "about", "gender", "dateOfBirth"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (req.files?.profileImage) {
      const file = req.files.profileImage;
      const uploadedImage = await uploadImageToCloudinary(file, "profile_images", 300, 80);
      updates.profileImage = uploadedImage.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Optional email notification
    /*
    await mailSender(
      user.email,
      "Profile Updated",
      `<p>Your profile has been updated successfully on Mind Space +.</p>`
    );
    */

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========== DELETE USER ACCOUNT ==========
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete related data if needed (posts, comments, messages)
    // await Post.deleteMany({ author: userId });
    // await Comment.deleteMany({ user: userId });
    // await Message.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// ========== GET ALL USERS (WITH OPTIONAL PAGINATION) ==========
export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page)) || 0;
    const limit = Math.min(100, parseInt(req.query.limit)) || 20;

    const users = await User.find()
      .select("-password")
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
