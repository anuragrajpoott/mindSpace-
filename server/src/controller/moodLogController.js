import MoodLog from '../model/MoodLog.js';
import User from '../model/User.js';

// Create Mood Log
export const createMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood, note } = req.body;

    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood is required" });
    }

    const moodLog = await MoodLog.create({ mood, note, user: userId });

    // Link moodLog to user (if applicable)
    await User.findByIdAndUpdate(userId, { moodLog: moodLog._id });

    res.status(201).json({ success: true, message: "Mood log created", data: moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create mood log", err: err.message });
  }
};

// Get Mood Log
export const getMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('moodLog');

    if (!user || !user.moodLog) {
      return res.status(404).json({ success: false, message: "Mood log not found" });
    }

    res.status(200).json({ success: true, message: "Mood log fetched", data: user.moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch mood log", err: err.message });
  }
};

// Update Mood Log
export const updateMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood, note } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.moodLog) {
      return res.status(404).json({ success: false, message: "Mood log not found" });
    }

    const updatedMoodLog = await MoodLog.findByIdAndUpdate(
      user.moodLog,
      { mood, note },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Mood log updated", data: updatedMoodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update mood log", err: err.message });
  }
};

// Delete Mood Log
export const deleteMoodLog = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.moodLog) {
      return res.status(404).json({ success: false, message: "Mood log not found" });
    }

    await MoodLog.findByIdAndDelete(user.moodLog);
    user.moodLog = null;
    await user.save();

    res.status(200).json({ success: true, message: "Mood log deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete mood log", err: err.message });
  }
};
