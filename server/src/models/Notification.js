import mongoose from 'mongoose';


const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required for notification"],
      index: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "friend_request", "message", "system"],
      required: [true, "Notification type is required"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: 1000,
      default: "",
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedModel",
      default: null,
    },
    relatedModel: {
      type: String,
      enum: ["Post", "Comment", "Friend", "Message"],
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
      index: true, // for querying unread notifications quickly
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification
