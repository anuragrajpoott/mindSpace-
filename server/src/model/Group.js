import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      type: String,
      trim: true,
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

groupSchema.index({ name: 1 });
groupSchema.index({ createdBy: 1 });

export default model('Group', groupSchema);
