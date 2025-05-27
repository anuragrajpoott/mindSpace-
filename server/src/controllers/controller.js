const User = require('../models/user');
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const newOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Here, usually you would store OTP with expiration in DB or cache
    // For demonstration, let's assume you save in a collection or send directly

    // Send mail
    await mailSender(email, "OTP for verification", `<h4>${newOtp}</h4>`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while sending OTP",
      error: error.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { userName, password, confirmPassword } = req.body;

    if (!userName || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all signup details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ userName, password: hashedPassword });

    const token = jwt.sign(
      { userName: newUser.userName, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    newUser.password = undefined; // hide password
    newUser.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    return res
      .cookie("token", token, options)
      .status(201)
      .json({
        success: true,
        message: "User signed up successfully",
        newUser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating account",
      error: error.message,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all login details",
      });
    }

    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User is not registered",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { userName: existingUser.userName, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    existingUser.password = undefined; // hide password
    existingUser.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    return res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        existingUser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
      error: error.message,
    });
  }
};

const Message = require("../models/friends");
const User = require("../models/user");

exports.sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.body;

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (recipient.friendRequests?.includes(senderId)) {
      return res.status(400).json({ success: false, message: "Request already sent" });
    }

    recipient.friendRequests.push(senderId);
    await recipient.save();

    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending request", error });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user.friendRequests?.includes(requesterId)) {
      return res.status(400).json({ success: false, message: "No request found" });
    }

    user.friends.push(requesterId);
    requester.friends.push(userId);

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
    
    await user.save();
    await requester.save();

    res.status(200).json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error accepting request", error });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user.friends?.includes(friendId)) {
      return res.status(400).json({ success: false, message: "Not friends" });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ success: true, message: "Friend removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing friend", error });
  }
};



exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    res.status(201).json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message", error });
  }
};

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
    res.status(500).json({ success: false, message: "Error retrieving messages", error });
  }
};

const Message = require("../models/friends");
const User = require("../models/user");

exports.sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.body;

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (recipient.friendRequests?.includes(senderId)) {
      return res.status(400).json({ success: false, message: "Request already sent" });
    }

    recipient.friendRequests.push(senderId);
    await recipient.save();

    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending request", error });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requesterId } = req.body;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user.friendRequests?.includes(requesterId)) {
      return res.status(400).json({ success: false, message: "No request found" });
    }

    user.friends.push(requesterId);
    requester.friends.push(userId);

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);
    
    await user.save();
    await requester.save();

    res.status(200).json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error accepting request", error });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user.friends?.includes(friendId)) {
      return res.status(400).json({ success: false, message: "Not friends" });
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ success: true, message: "Friend removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing friend", error });
  }
};



exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    res.status(201).json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message", error });
  }
};

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
    res.status(500).json({ success: false, message: "Error retrieving messages", error });
  }
};


const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    const newComment = await Comment.create({
      user: userId,
      text,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting comment', error });
  }
};



exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Like removed' : 'Post liked',
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error toggling like', error });
  }
};


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

const User = require("../models/user");

// GET: Fetch user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password") // Exclude password
      .populate("posts likes comments friends");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// PUT: Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, phoneNo, about, gender, profileImage, dateOfBirth } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.phoneNo = phoneNo ?? user.phoneNo;
    user.about = about ?? user.about;
    user.gender = gender ?? user.gender;
    user.profileImage = profileImage ?? user.profileImage;
    user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// DELETE: Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error,
    });
  }
};

// GET: Get all users (for admin or exploration features)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
