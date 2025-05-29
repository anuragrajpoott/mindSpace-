import Post from '../model/Post.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content, media } = req.body;
    const post = await Post.create({ content, media, likes: 0, comments: [] });
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Post creation failed' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, post: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Post update failed' });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Post deletion failed' });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
};
