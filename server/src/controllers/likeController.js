import Like from "../models/Like.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// ========== TOGGLE LIKE (POST/COMMENT) ==========
export const toggleLike = async (req, res) => {
  try {
    const { targetId, targetType } = req.body; // targetType: "Post" | "Comment"
    const userId = req.user.id;

    if (!["Post", "Comment"].includes(targetType)) {
      return res.status(400).json({ success: false, message: "Invalid target type." });
    }

    const existingLike = await Like.findOne({ user: userId, targetId, targetType });

    if (existingLike) {
      await existingLike.deleteOne();
      return res.status(200).json({ success: true, message: `${targetType} unliked.` });
    }

    const newLike = await Like.create({ user: userId, targetId, targetType });

    return res.status(201).json({ success: true, message: `${targetType} liked.`, like: newLike });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({ success: false, message: "Failed to toggle like." });
  }
};

// ========== GET LIKES FOR A TARGET ==========
export const getLikesForTarget = async (req, res) => {
  try {
    const { targetId } = req.params;

    const likes = await Like.find({ targetId }).populate("user", "userName profileImage");

    res.status(200).json({ success: true, likes });
  } catch (error) {
    console.error("Get Likes Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch likes." });
  }
};

// ========== CHECK IF USER LIKED A TARGET ==========
export const isLikedByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetId } = req.params;

    const like = await Like.findOne({ user: userId, targetId });

    res.status(200).json({ success: true, liked: !!like });
  } catch (error) {
    console.error("Check Like Error:", error);
    res.status(500).json({ success: false, message: "Failed to check like." });
  }
};
