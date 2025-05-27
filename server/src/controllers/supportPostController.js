import mongoose from 'mongoose';

import Post from '../models/SupportPost.js';
import MoodLog from '../models/MoodLog.js';
import SupportResource from '../models/SupportResource.js';

// ========== FETCH ALL GROUPS ==========

// ========== CREATE A SUPPORT POST ==========
export const createSupportPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    const post = new Post({ author: userId, content });
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Create Support Post Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== LOG MOOD ==========



