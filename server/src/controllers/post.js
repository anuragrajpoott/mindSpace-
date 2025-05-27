const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    const newComment = await Comment.create({
      user: userId,
      text,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add comment', error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting comment', error });
  }
};



exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Like removed' : 'Post liked',
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error toggling like', error });
  }
};
