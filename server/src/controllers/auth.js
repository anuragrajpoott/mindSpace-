const User = require('../models/User');
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
