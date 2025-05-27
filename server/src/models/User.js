const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allow multiple docs without email
  },
  phoneNo: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", ""],
    default: "",
  },
  dateOfBirth: {
    type: Date,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Make sure your Post model is named "Post"
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Like",
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencing the same User model for friends
  }],
  otp: {
    type: String,
    expires: 300,  // 5 minutes in seconds
  },
  token: {
    type: String,
    expires: 86400, // 24 hours in seconds
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("User", userSchema);
