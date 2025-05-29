import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

// Register
export const registerUser = async (req, res) => {
  try {
    const { userName, password, fullName } = req.body;

    if (!userName || !password || !fullName)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const existingUser = await User.findOne({ userName });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, password: hashedPassword, fullName });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({ success: true, user: newUser, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, about, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, about, profileImage },
      { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};

// Search Users
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { userName: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');

    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};
