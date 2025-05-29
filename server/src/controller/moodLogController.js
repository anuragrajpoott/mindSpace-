import MoodLog from '../model/MoodLog.js';
import User from '../model/User.js';

// Create Mood Log
export const createMoodLog = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const moodLog = await MoodLog.create({ mood, note });
    await User.findByIdAndUpdate(req.user.id, { moodLog: moodLog._id });
    res.status(201).json({ success: true, data: moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create mood log' });
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
