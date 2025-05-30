import MoodLog from '../model/MoodLog.js';
import User from '../model/User.js'

// Create Mood Log
export const createMoodLog = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const userId = req.user.id;

    console.log("User ID:", userId);
    console.log("Mood:", mood);

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood is required",
      });
    }

    // Save mood with user ID
    const moodLog = await MoodLog.create({ mood, note, user: userId });
    console.log("MoodLog created:", moodLog);

    // Optionally update user's moodLog reference (if one-to-one relationship)
    await User.findByIdAndUpdate(userId, { moodLog: moodLog._id });

    res.status(201).json({ success: true, data: moodLog });
  } catch (err) {
    console.error("Error creating mood log:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create mood log",
      error: err.message,
    });
  }
};


// Get Mood Log
export const getMoodLog = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('moodLog');
    res.status(200).json({ success: true, data: user.moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get mood log' });
  }
};

// Update Mood Log
export const updateMoodLog = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const user = await User.findById(req.user.id);
    const moodLog = await MoodLog.findByIdAndUpdate(user.moodLog, { mood, note }, { new: true });
    res.status(200).json({ success: true, data: moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update mood log' });
  }
};

// Delete Mood Log
export const deleteMoodLog = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await MoodLog.findByIdAndDelete(user.moodLog);
    user.moodLog = null;
    await user.save();
    res.status(200).json({ success: true, message: 'Mood log deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete mood log' });
  }
};
