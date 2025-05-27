import mongoose from 'mongoose';

import Post from '../models/SupportPost.js';
import MoodLog from '../models/MoodLog.js';
import SupportResource from '../models/SupportResource.js';

export const logMood = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mood, note } = req.body;

    if (!mood) {
      return res.status(400).json({ success: false, message: 'Mood is required' });
    }

    const moodLog = new MoodLog({ user: userId, mood, note });
    await moodLog.save();

    res.status(201).json({ success: true, moodLog });
  } catch (error) {
    console.error("Log Mood Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};