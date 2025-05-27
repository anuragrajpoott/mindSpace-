const User = require("../models/User");
const cloudinary = require("../utils/fileUpload"); // Your cloudinary helper
// const { mailSender } = require("../utils/mailSender"); // Your mail sender helper


// GET: Fetch user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate([
        { path: "posts", select: "_id content createdAt" },
        { path: "likes", select: "_id" },           // adjust fields as per schema
        { path: "comments", select: "_id text" },
        { path: "friends", select: "_id userName profileImage" },
      ]);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// PUT: Update user profile

// GET, DELETE, GET ALL USERS remain unchanged

// PUT: Update user profile with Cloudinary image upload
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fields allowed to update
    const updateFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNo",
      "about",
      "gender",
      "dateOfBirth",
    ];

    const updates = {};
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle profile image upload to Cloudinary (if provided)
    if (req.files && req.files.profileImage) {
      const file = req.files.profileImage;
      const uploadedImage = await cloudinary.uploadImageToCloudinary(file, "profile_images", 300, 80);
      updates.profileImage = uploadedImage.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Optional: Send email notification on profile update
    /*
    await mailSender(
      user.email,
      "Profile Updated",
      `<p>Your profile has been updated successfully on Mind Space +.</p>`
    );
    */

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE: Delete user account and optionally related data
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Optional: Delete related posts, comments, messages here
    // await Post.deleteMany({ author: userId });
    // await Comment.deleteMany({ user: userId });
    // await Message.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// GET: Get all users with pagination (optional)
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;

    const users = await User.find()
      .select("-password")
      .skip(page * limit)
      .limit(limit);

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
