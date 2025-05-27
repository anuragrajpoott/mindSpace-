import mongoose from 'mongoose';
import Group from '../models/Group.js';
import Post from '../models/SupportPost.js';
import MoodLog from '../models/MoodLog.js';
import SupportResource from '../models/SupportResource.js';

// ========== FETCH ALL GROUPS ==========
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Fetch Groups Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== TOGGLE JOIN GROUP ==========
export const toggleJoinGroup = async (req, res) => {
  try {
    const userId = req.user._id;
    const groupId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ success: false, message: 'Invalid group ID' });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    const index = group.members.findIndex(memberId => memberId.equals(userId));
    if (index === -1) {
      group.members.push(userId);
      await group.save();
      return res.status(200).json({ success: true, joined: true, message: 'Joined group' });
    } else {
      group.members.splice(index, 1);
      await group.save();
      return res.status(200).json({ success: true, joined: false, message: 'Left group' });
    }
  } catch (error) {
    console.error("Toggle Join Group Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========== FETCH RECENT SUPPORT POSTS ==========
export const getSupportPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'name avatar userName');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetch Support Posts Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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
