const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // optional, but usually posts have a title
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: String, // URL or path to media (image/video)
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);
