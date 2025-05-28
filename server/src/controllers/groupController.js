import Group from "../models/Group.js";
import User from "../models/User.js";

// ========== CREATE GROUP ==========
export const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ success: false, message: "Group name is required." });
    }

    const group = await Group.create({
      name,
      description,
      createdBy: userId,
      members: [userId],
    });

    res.status(201).json({ success: true, message: "Group created successfully.", group });
  } catch (error) {
    console.error("Create Group Error:", error);
    res.status(500).json({ success: false, message: "Failed to create group." });
  }
};

// ========== JOIN GROUP ==========
export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ success: false, message: "You are already a member." });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json({ success: true, message: "Joined the group successfully." });
  } catch (error) {
    console.error("Join Group Error:", error);
    res.status(500).json({ success: false, message: "Failed to join group." });
  }
};

// ========== LEAVE GROUP ==========
export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();

    res.status(200).json({ success: true, message: "Left the group successfully." });
  } catch (error) {
    console.error("Leave Group Error:", error);
    res.status(500).json({ success: false, message: "Failed to leave group." });
  }
};

// ========== UPDATE GROUP ==========
export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group || group.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized or group not found." });
    }

    if (name) group.name = name;
    if (description) group.description = description;

    await group.save();

    res.status(200).json({ success: true, message: "Group updated successfully.", group });
  } catch (error) {
    console.error("Update Group Error:", error);
    res.status(500).json({ success: false, message: "Failed to update group." });
  }
};

// ========== DELETE GROUP ==========
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group || group.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized or group not found." });
    }

    await Group.findByIdAndDelete(groupId);

    res.status(200).json({ success: true, message: "Group deleted successfully." });
  } catch (error) {
    console.error("Delete Group Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete group." });
  }
};

// ========== GET ALL GROUPS ==========
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("createdBy", "userName profileImage").select("-__v");
    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Get Groups Error:", error);
    res.status(500).json({ success: false, message: "Failed to get groups." });
  }
};

// ========== GET GROUP MEMBERS ==========
export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId).populate("members", "userName profileImage");
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    res.status(200).json({ success: true, members: group.members });
  } catch (error) {
    console.error("Get Group Members Error:", error);
    res.status(500).json({ success: false, message: "Failed to get group members." });
  }
};
