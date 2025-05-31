import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const moodLogSchema = new Schema({
  mood: {
    type: String,
    enum: ['good', 'okay', 'sad', 'depressed'],
    required: true,
    lowercase: true,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

moodLogSchema.index({ user: 1, createdAt: -1 });

export default model('MoodLog', moodLogSchema);
