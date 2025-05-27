import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mood: { type: String, enum: ['happy', 'sad', 'anxious', 'neutral', 'depressed'], required: true },
  note: String,
  loggedAt: { type: Date, default: Date.now },
});

export default mongoose.model('MoodLog', moodLogSchema);
