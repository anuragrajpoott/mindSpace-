import Post from '../model/Post.js';
import User from "../model/User.js"

// Create Post
export const createPost = async (req, res) => {
  try {
    const user = req.user.id;
    console.log(user)
    const { content, media } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const post = await Post.create({
      user,
      content,
      media,
      likes: 0,
      comments: [],
    });

    await User.findByIdAndUpdate(
      user,
      { $push: { posts: post._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Post creation failed",
      error: err.message,
    });
  }
};



// Update Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, media } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content, media },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: "Post update failed", err: err.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Post deletion failed", err: err.message });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user");

    res.status(200).json({ success: true, message: "Posts fetched successfully", posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch posts", err: err.message });
  }
};

// Like a Post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ success: true, message: "Post liked", post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to like post", err: err.message });
  }
};

// Comment on a Post
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId, userName } = req.body;

    if (!comment || !userId || !userName) {
      return res.status(400).json({ success: false, message: "Comment, userId, and userName are required" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const newComment = { comment, userId, userName, createdAt: new Date() };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ success: true, message: "Comment added", comment: newComment });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add comment", err: err.message });
  }
};
