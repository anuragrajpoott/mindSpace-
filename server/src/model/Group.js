import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Group name is required'],
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: String, // Consider creating a Message model if messages grow in complexity
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
export default Group;
