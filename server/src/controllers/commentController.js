// src/controllers/commentController.js
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// === Add Comment ===
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    if (!content || !postId) {
      return res.status(400).json({ success: false, message: "Comment content and post ID are required" });
    }

    const comment = await Comment.create({
      user: userId,
      post: postId,
      content,
    });

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error("Add Comment Error:", error);
    return res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

// === Delete Comment (only comment owner can delete) ===
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Authorization check
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
    }

    await comment.remove();

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

    return res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    return res.status(500).json({ success: false, message: "Error deleting comment" });
  }
};

// === Get Comments by Post ===
export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId })
      .populate("user", "userName profileImage") // populate user info
      .sort({ createdAt: -1 }); // latest comments first

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};
