import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { userName, password, fullName } = req.body;

    if (!userName || !password || !fullName) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, password: hashedPassword, fullName });

      // 4. Generate JWT
    const payload = { id: newUser._id, userName: newUser.userName};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 5. Set cookie and respond
    newUser.password = undefined;
    const cookieOptions = {
      httpOnly: true,
      secure: true, // set secure flag in production
      sameSite: "None",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    };

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
        token,
        newUser,
      });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', err: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { userName ,password } = req.body;

    // 1. Validate input
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ userName })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered. Please sign up.",
      });
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // 4. Generate JWT
    const payload = { id: user._id, userName: user.userName};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 5. Set cookie and respond
    user.password = undefined;
    const cookieOptions = {
      httpOnly: true,
      secure: true, // set secure flag in production
      sameSite: "None",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    };

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
        token,
        user,
      });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};


// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {userName, fullName, about, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, about, profileImage ,userName},
      { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};


