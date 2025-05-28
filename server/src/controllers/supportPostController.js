import SupportPost from "../models/SupportPost.js";
import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";

// ========== CREATE SUPPORT POST ==========
export const createSupportPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content, groupId } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    const newPost = new SupportPost({
      author: userId,
      content,
      group: groupId || null,
    });
    await newPost.save();

    await User.findByIdAndUpdate(userId, { $push: { supportPosts: newPost._id } });

    // Optional email notification
    const user = await User.findById(userId);
    if (user?.email) {
      await mailSender(
        user.email,
        "Support Post Created",
        `<p>Hi ${user.firstName}, your support post was successfully published on Supportify+.</p>`
      );
    }

    res.status(201).json({ success: true, message: "Support post created", post: newPost });
  } catch (error) {
    console.error("Create Support Post Error:", error);
    res.status(500).json({ success: false, message: "Error creating support post", error: error.message });
  }
};

// ========== GET ALL SUPPORT POSTS ==========
export const getAllSupportPosts = async (req, res) => {
  try {
    const posts = await SupportPost.find()
      .sort({ createdAt: -1 })
      .populate("author", "userName avatar")
      .populate("group", "name description");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetch Support Posts Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support posts", error: error.message });
  }
};

// ========== GET SUPPORT POST BY ID ==========
export const getSupportPostById = async (req, res) => {
  try {
    const post = await SupportPost.findById(req.params.id)
      .populate("author", "userName avatar")
      .populate("group", "name description");

    if (!post) return res.status(404).json({ success: false, message: "Support post not found" });

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Fetch Support Post Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support post", error: error.message });
  }
};

// ========== UPDATE SUPPORT POST ==========
export const updateSupportPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const post = await SupportPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Support post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to edit this support post" });
    }

    if (content !== undefined) post.content = content;

    await post.save();

    res.status(200).json({ success: true, message: "Support post updated", post });
  } catch (error) {
    console.error("Update Support Post Error:", error);
    res.status(500).json({ success: false, message: "Error updating support post", error: error.message });
  }
};

// ========== DELETE SUPPORT POST ==========
export const deleteSupportPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await SupportPost.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Support post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this support post" });
    }

    await SupportPost.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(userId, { $pull: { supportPosts: postId } });

    res.status(200).json({ success: true, message: "Support post deleted" });
  } catch (error) {
    console.error("Delete Support Post Error:", error);
    res.status(500).json({ success: false, message: "Error deleting support post", error: error.message });
  }
};

// ========== GET SUPPORT POSTS BY USER ==========
export const getSupportPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await SupportPost.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("group", "name description");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetch Support Posts by User Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support posts", error: error.message });
  }
};

// ========== GET SUPPORT POSTS BY GROUP ==========
export const getSupportPostsByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const posts = await SupportPost.find({ group: groupId })
      .sort({ createdAt: -1 })
      .populate("author", "userName avatar");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetch Support Posts by Group Error:", error);
    res.status(500).json({ success: false, message: "Error fetching support posts", error: error.message });
  }
};
