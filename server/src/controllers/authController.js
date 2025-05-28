import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { mailSender } from '../utils/mailSender.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

// ========== REGISTER USER ==========
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    if (!userName || !password || !firstName || !lastName) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) return res.status(400).json({ success: false, message: 'username already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      // other default fields...
    });

    // Optional: send welcome email
    // await mailSender(email, 'Welcome to Supportify+', `<p>Hi ${firstName}, welcome!</p>`);

    res.status(201).json({ success: true, message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error('Register User Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== LOGIN USER ==========
export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      return res.status(400).json({ success: false, message: 'username and password required' });

    const user = await User.findOne({ userName });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    user.token = token

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Login User Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== LOGOUT USER (OPTIONAL) ==========
export const logoutUser = async (req, res) => {
  try {
    // If using token blacklisting or sessions, implement here.
    res.status(200).json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout User Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== GET CURRENT USER ==========
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Get Current User Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== FORGOT PASSWORD ==========
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Generate token and expiration
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <p>You requested a password reset.</p>
      <p>Click this link to reset: <a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request, ignore this email.</p>
    `;

    await mailSender(email, 'Password Reset Request', message);

    res.status(200).json({ success: true, message: 'Reset email sent' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== RESET PASSWORD ==========
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) return res.status(400).json({ success: false, message: 'Password required' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== UPDATE PASSWORD (AUTHENTICATED USER) ==========
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new passwords are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
