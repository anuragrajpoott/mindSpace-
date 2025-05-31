import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    trim: true,
    maxlength: 300,
    default: '',
  },
  media: {
    type: String,
    trim: true,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
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

postSchema.index({ content: 'text' });

export default model('Post', postSchema);
