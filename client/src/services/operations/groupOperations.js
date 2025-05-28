import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setGroups,
  addGroup,
  updateSupportGroup,
  removeGroup,
  setError,
} from "../../redux/Slices/groupSlice";
import toast from "react-hot-toast";

// Backend endpoints (use your endpoints config or replace with strings)
const baseUrl = "/groups";

// Create group (POST /)
export const createGroup = (groupData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", baseUrl, groupData);
    dispatch(addGroup(res.data.group));
    toast.success("Group created successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create group");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get all groups (GET /)
export const fetchGroups = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", baseUrl);
    dispatch(setGroups(res.data.groups));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch groups");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update group (PUT /:groupId)
export const updateGroup = (groupId, updateData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${baseUrl}/${groupId}`, updateData);
    dispatch(updateGroup(res.data.group));
    toast.success("Group updated successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update group");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete group (DELETE /:groupId)
export const deleteGroup = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${baseUrl}/${groupId}`);
    dispatch(removeGroup(groupId));
    toast.success("Group deleted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete group");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Join group (POST /:groupId/join)
export const joinGroup = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `${baseUrl}/${groupId}/join`);
    toast.success(res.data.message || "Joined group successfully!");
    // Optional: update group members or user groups state if needed
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to join group");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Leave group (POST /:groupId/leave)
export const leaveGroup = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `${baseUrl}/${groupId}/leave`);
    toast.success(res.data.message || "Left group successfully!");
    // Optional: update group members or user groups state if needed
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to leave group");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get group members (GET /:groupId/members)
export const fetchGroupMembers = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/${groupId}/members`);
    // You can dispatch action to store members if you have it in your slice
    // e.g., dispatch(setGroupMembers(res.data.members))
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch group members");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
