// src/controllers/authController.js
import User from "../models/User.js";
import Post from "../models/Post.js";
import {mailSender} from "../utils/mailSender.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userName: user.userName, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// Send OTP for email verification (consider saving OTP for verification later)
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    // TODO: Save OTP to DB/cache with expiry for verification later

    await mailSender(email, "OTP Verification", `<h4>Your OTP is: ${otp}</h4>`);

    // For dev/testing, consider returning OTP in response (remove in prod)
    return res.status(200).json({ success: true, message: "OTP sent successfully" /*, otp */ });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

// Sign up user (add email if applicable)
export const signUp = async (req, res) => {
  try {
    const { userName, password, confirmPassword /*, email */ } = req.body;

    if (!userName || !password || !confirmPassword /* || !email */) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    // Optionally check email uniqueness if you include it

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, password: hashedPassword /*, email */ });

    const token = generateToken(newUser);
    newUser.password = undefined; // remove password before returning
    newUser.token = token;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

// Log in user
export const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    user.password = undefined;
    user.token = token;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Search users by userName and posts by title/description
export const search = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
    }

    const userRegex = new RegExp(query, "i"); // case-insensitive regex

    // Search users by userName
    const users = await User.find({ userName: userRegex }).select("userName profileImage");

    // Search posts by title or description (adjust as per your schema)
    const posts = await Post.find({
      $or: [
        { title: userRegex },
        { description: userRegex },
      ],
    })
      .populate("createdBy", "userName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: {
        users,
        posts,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Search failed", error: error.message });
  }
};
