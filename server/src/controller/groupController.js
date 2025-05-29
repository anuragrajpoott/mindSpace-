import Group from '../model/Group.js';
import User from '../model/User.js';

// Create Group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const group = await Group.create({ name, members: [req.user.id] });
    res.status(201).json({ success: true, data: group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create group' });
  }
};

// Get All Groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members', 'userName');
    res.status(200).json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch groups' });
  }
};

// Update Group
export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(groupId, { name }, { new: true });
    res.status(200).json({ success: true, data: updatedGroup });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update group' });
  }
};

// Delete Group
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    await Group.findByIdAndDelete(groupId);
    res.status(200).json({ success: true, message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete group' });
  }
};

// Join Group
export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }
    res.status(200).json({ success: true, message: 'Joined group', group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to join group' });
  }
};

// Send Message
export const sendMessageToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;
    const group = await Group.findById(groupId);
    group.messages.push(message);
    await group.save();
    res.status(200).json({ success: true, message: 'Message sent', group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};
