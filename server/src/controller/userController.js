
import Post from '../model/Post.js';
import Resource from '../model/Resource.js';
import User from '../model/User.js';
import Group from '../model/Group.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload) => {
  // console.log("JWT Secret from login controller:",process.env.JWT_SECRET)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const cookieOptions = {
  httpOnly: true,
  secure: true, // secure cookie only in production
  sameSite: 'None', // required for cross-site cookies
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
};

export const registerUser = async (req, res) => {
  try {
    const { userName, password, fullName } = req.body;
    if (!userName || !password || !fullName)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const existingUser = await User.findOne({ userName });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName:userName, password: hashedPassword, fullName:fullName });

    // console.log(newUser)

    const token = createToken({ id: newUser._id, userName: newUser.userName });

    newUser.password = undefined; // hide password

    return res
      .cookie('token', token, cookieOptions)
      .status(201)
      .json({ success: true, message: 'Registration successful', token, user: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const user = await User.findOne({ userName });
    if (!user)
      return res.status(401).json({ success: false, message: 'User not registered' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ success: false, message: 'Incorrect password' });

    // console.log(user)

    const token = createToken({ id: user._id, userName: user.userName });

    // console.log("login token:",token)
 
    user.password = undefined; // hide password

    return res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({ success: true, message: 'Login successful', token, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName, fullName, about, profileImage } = req.body;

    if (!userName && !fullName && !about && !profileImage) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, fullName, about, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Profile updated", user: updatedUser });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Profile update failed", error: error.message });
  }
};




export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Case-insensitive regex for partial matching
    const regex = new RegExp(query, "i");

    const [users, posts, resources, groups] = await Promise.all([
      User.find({ 
        $or: [
          { userName: regex }, 
          { fullName: regex },
          { about: regex }
        ] 
      }).select("-password -__v"),

      Post.find({
        $or: [
          { title: regex },
          { description: regex }
        ]
      }).populate("user", "userName fullName profileImage").select("-__v"),

      Resource.find({
        $or: [
          { title: regex },
          { description: regex }
        ]
      }).select("-__v"),

      Group.find({ 
        $or: [
          { name: regex },
          { description: regex }
        ] 
      }).select("-__v")
    ]);

    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: {
        users,
        posts,
        resources,
        groups,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch search results",
      error: error.message,
    });
  }
};
