import Group from '../model/Group.js';
import User from "../model/User.js"

// Create Group
export const createGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Group name is required' });
    }

    const group = await Group.create({ name, members: [userId] , createdBy:userId});

    const user = await User.findByIdAndUpdate(userId,{
      $push:{
        groups:group._id
      }
    }, {new:true})

    res.status(201).json({ success: true, message: 'Group created', data: group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create group', error: err.message });
  }
};

// Get All Groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members', 'userName');
    res.status(200).json({ success: true, message: 'Groups fetched', data: groups });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch groups', error: err.message });
  }
};

// Update Group
export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Group name is required' });
    }

    const updatedGroup = await Group.findByIdAndUpdate(groupId, { name }, { new: true });

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({ success: true, message: 'Group updated', data: updatedGroup });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update group', error: err.message });
  }
};

// Delete Group
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({ success: true, message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete group', error: err.message });
  }
};

// Join Group
export const joinGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.status(200).json({ success: true, message: 'Joined group', data: group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to join group', error: err.message });
  }
};

// Send Message to Group
export const sendMessageToGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    group.messages.push(text);
    await group.save();

    res.status(200).json({ success: true, message: 'Message sent', data: group });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: err.message });
  }
};






