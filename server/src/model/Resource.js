import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: '',
  },
  url: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: v => /^https?:\/\/.+/.test(v),
      message: 'Invalid URL format',
    },
  },
  category: {
    type: String,
    enum: ['hotline', 'article', 'video', 'other'],
    default: 'other',
    lowercase: true,
    trim: true,
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

resourceSchema.index({ category: 1 });
resourceSchema.index({ title: 'text', description: 'text' });

export default model('Resource', resourceSchema);
