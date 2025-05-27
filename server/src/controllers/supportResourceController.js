import mongoose from 'mongoose';

import Post from '../models/SupportPost.js';
import MoodLog from '../models/MoodLog.js';
import SupportResource from '../models/SupportResource.js';

// ========== FETCH SUPPORT RESOURCES ==========
export const getSupportResources = async (req, res) => {
  try {
    const resources = await SupportResource.find();
    res.status(200).json({ success: true, resources });
  } catch (error) {
    console.error("Fetch Support Resources Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};