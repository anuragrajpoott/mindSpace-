import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Post description is required"],
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
    media: {
      type: String, // Cloudinary URL or local path
      default: "",
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private", "friends-only"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post
