import Group from '../models/Group.js';
import Post from '../models/SupportPost.js';
import MoodLog from '../models/MoodLog.js';
import SupportResource from '../models/SupportResource.js';

// Fetch all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle join group
export const toggleJoinGroup = async (req, res) => {
  try {
    const userId = req.user._id; // assuming auth middleware sets req.user
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });

    const index = group.members.indexOf(userId);
    if (index === -1) {
      group.members.push(userId);
      await group.save();
      return res.json({ success: true, joined: true });
    } else {
      group.members.splice(index, 1);
      await group.save();
      return res.json({ success: true, joined: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch recent support posts
export const getSupportPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20).populate('author', 'name');
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a support post
export const createSupportPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required' });

    const post = new Post({ author: userId, content });
    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Log mood
export const logMood = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mood, note } = req.body;
    if (!mood) return res.status(400).json({ success: false, message: 'Mood is required' });

    const moodLog = new MoodLog({ user: userId, mood, note });
    await moodLog.save();
    res.json({ success: true, moodLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch support resources
export const getSupportResources = async (req, res) => {
  try {
    const resources = await SupportResource.find();
    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
