import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// ========== CREATE A COMMENT ==========
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!text || !postId || !content) {
      return res.status(400).json({ success: false, message: "Post ID, content and text are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.create({ user: userId, post: postId,content });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ success: true, message: "Comment added", comment });
  } catch (error) {
    console.error("Create Comment Error:", error);
    res.status(500).json({ success: false, message: "Error creating comment", error: error.message });
  }
};

// ========== GET COMMENTS BY POST ==========
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user", "userName");

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
  }
};

// ========== UPDATE COMMENT ==========
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to edit this comment" });
    }

    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json({ success: true, message: "Comment updated", comment });
  } catch (error) {
    console.error("Update Comment Error:", error);
    res.status(500).json({ success: false, message: "Error updating comment", error: error.message });
  }
};

// ========== DELETE COMMENT ==========
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: id } });

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ success: false, message: "Error deleting comment", error: error.message });
  }
};

// ========== TOGGLE LIKE ON COMMENT ==========
export const toggleLikeOnComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    const liked = comment.likes.includes(userId);
    if (liked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    res.status(200).json({
      success: true,
      message: liked ? "Comment unliked" : "Comment liked",
      likesCount: comment.likes.length,
    });
  } catch (error) {
    console.error("Toggle Like Comment Error:", error);
    res.status(500).json({ success: false, message: "Error toggling like", error: error.message });
  }
};

// ========== GET COMMENTS BY USER ==========
export const getCommentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const comments = await Comment.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("post", "_id content");

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Get User Comments Error:", error);
    res.status(500).json({ success: false, message: "Error fetching user comments", error: error.message });
  }
};
