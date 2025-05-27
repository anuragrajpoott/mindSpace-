const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Toggle Like (for posts or comments)
exports.toggleLike = async (req, res) => {
  try {
    const { targetId, type } = req.params; // type can be 'post' or 'comment'
    const userId = req.user.id;

    if (!["post", "comment"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid like target type" });
    }

    // Choose model based on type
    const Model = type === "post" ? Post : Comment;

    const item = await Model.findById(targetId);
    if (!item) {
      return res.status(404).json({ success: false, message: `${type} not found` });
    }

    const alreadyLiked = item.likes.includes(userId);

    if (alreadyLiked) {
      item.likes.pull(userId);
    } else {
      item.likes.push(userId);
    }

    await item.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? `${type} unliked` : `${type} liked`,
      likesCount: item.likes.length,
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while toggling like",
      error: error.message,
    });
  }
};
