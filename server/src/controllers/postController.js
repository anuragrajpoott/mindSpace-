const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { mailSender } = require("../utils/mailSender");

// ========== CREATE A POST ==========
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    // Handle image upload if present (e.g. via multipart form-data)
    let imageUrl;
    if (req.files?.image) {
      const file = req.files.image;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "SupportifyPlus/Posts",
        resource_type: "image",
        quality: "auto",
      });
      imageUrl = uploadResult.secure_url;
    }

    if (!content && !imageUrl) {
      return res.status(400).json({ success: false, message: "Post must contain text or image" });
    }

    const newPost = await Post.create({
      content,
      image: imageUrl,
      author: userId,
    });

    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    // Send notification email to user
    const user = await User.findById(userId);
    if (user.email) {
      await mailSender(
        user.email,
        "New Post Created",
        `<p>Hi ${user.firstName}, your new post was successfully published on Supportify+.</p>`
      );
    }

    res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ success: false, message: "Error creating post", error: error.message });
  }
};

// ========== GET ALL POSTS ==========
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "userName avatar")
      .populate({
        path: "comments",
        populate: { path: "user", select: "userName avatar" },
      });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    res.status(500).json({ success: false, message: "Error fetching posts", error: error.message });
  }
};

// ========== GET POST BY ID ==========
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "userName avatar")
      .populate({
        path: "comments",
        populate: { path: "user", select: "userName avatar" },
      });

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Fetch Post Error:", error);
    res.status(500).json({ success: false, message: "Error fetching post", error: error.message });
  }
};

// ========== UPDATE POST ==========
exports.updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to edit this post" });
    }

    // Handle image upload if present
    if (req.files?.image) {
      const file = req.files.image;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "SupportifyPlus/Posts",
        resource_type: "image",
        quality: "auto",
      });
      post.image = uploadResult.secure_url;
    }

    post.content = content || post.content;

    await post.save();

    res.status(200).json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ success: false, message: "Error updating post", error: error.message });
  }
};

// ========== DELETE POST ==========
exports.deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ success: false, message: "Error deleting post", error: error.message });
  }
};
