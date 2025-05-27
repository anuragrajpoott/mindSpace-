import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Toggle Like on a Post or Comment
export const toggleLike = async (req, res) => {
  try {
    const { targetId, type } = req.params; // 'post' or 'comment'
    const userId = req.user.id;

    if (!["post", "comment"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid like target type" });
    }

    const Model = type === "post" ? Post : Comment;
    const item = await Model.findById(targetId);

    if (!item) {
      return res.status(404).json({ success: false, message: `${type} not found` });
    }

    const alreadyLiked = item.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      item.likes.pull(userId);
    } else {
      item.likes.push(userId);
    }

    await item.save();

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? `${type} unliked` : `${type} liked`,
      likesCount: item.likes.length,
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while toggling like",
      error: error.message,
    });
  }
};

// Get all likes for a post (with user info)
export const getLikesForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("likes", "userName avatar");
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    return res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    console.error("Get Likes Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get posts liked by a user
export const getLikedPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
      path: "likes",
      select: "_id content createdAt",
      populate: { path: "createdBy", select: "userName avatar" },
    });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, likedPosts: user.likes });
  } catch (error) {
    console.error("Get User Likes Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
