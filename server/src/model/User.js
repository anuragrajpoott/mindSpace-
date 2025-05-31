import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    trim: true,
    default: '',
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  moodLog: { type: Schema.Types.ObjectId, ref: 'MoodLog' },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj.password;
      return obj;
    }
  },
  toObject: { virtuals: true },
});

userSchema.index({ userName: 1 });

export default model('User', userSchema);
