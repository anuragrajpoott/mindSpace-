import mongoose from 'mongoose';


const supportResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["hotline", "article", "video", "other"],
      default: "other",
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SupportResource = mongoose.model("SupportResource", supportResourceSchema);

export default SupportResource
