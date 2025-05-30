import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: ['good', 'sad', 'okay', 'depressed'],
      required: [true, 'Mood is required'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
  },
  { timestamps: true }
);

const MoodLog = mongoose.model('MoodLog', moodLogSchema);
export default MoodLog;
