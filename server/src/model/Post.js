import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    media: {
      type: String, // Cloudinary URL or local path
      default: "",
      trim: true,
    },
    likes: 
      {
        type: Number,
      },
    
    comments: [
      {
        type: String,
        ref: "Comment",
      },
    ],
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post
