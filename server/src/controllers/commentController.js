const Comment = require("../models/Comment");
const Post = require("../models/Post");

// === Add Comment ===
exports.addComment = async (req, res) => {
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

// === Delete Comment ===
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

    return res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    return res.status(500).json({ success: false, message: "Error deleting comment" });
  }
};

exports.getCommentsByPost = async (req, res) => {
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

// // === Toggle Like on Post ===
// exports.toggleLike = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.user.id;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ success: false, message: "Post not found" });
//     }

//     const alreadyLiked = post.likes.includes(userId);

//     if (alreadyLiked) {
//       post.likes.pull(userId);
//     } else {
//       post.likes.push(userId);
//     }

//     await post.save();

//     return res.status(200).json({
//       success: true,
//       message: alreadyLiked ? "Like removed" : "Post liked",
//       likesCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Toggle Like Error:", error);
//     return res.status(500).json({ success: false, message: "Error toggling like" });
//   }
// };
