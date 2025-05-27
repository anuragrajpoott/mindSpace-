import mongoose from 'mongoose';


const moodLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "anxious", "neutral", "depressed"],
      required: [true, "Mood is required"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    loggedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const MoodLog = mongoose.model("MoodLog", moodLogSchema);

export default MoodLog
