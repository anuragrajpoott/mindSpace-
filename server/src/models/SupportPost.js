import mongoose from 'mongoose';


const supportPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
      index: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const SupportPost = mongoose.model("SupportPost", supportPostSchema);
export default SupportPost