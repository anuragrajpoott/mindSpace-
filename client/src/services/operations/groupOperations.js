// src/operations/groupOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setGroups, toggleJoinGroup } from "../../redux/Slices/groupSlice";
import toast from "react-hot-toast";

const { GET_GROUPS, JOIN_GROUP, LEAVE_GROUP } = endPoints;

/**
 * Fetch all support groups
 */
export const fetchGroups = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_GROUPS);
    const { success, groups } = res.data;

    if (!success) throw new Error("Failed to fetch groups");

    dispatch(setGroups(groups));
  } catch (error) {
    console.error("Fetch Groups Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Unable to load groups");
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Toggle join/leave a group
 * @param {string} groupId - Group ID
 */
export const toggleGroupJoin = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Try joining first
    let res = await axiosConnector("POST", JOIN_GROUP(groupId));
    let { joined } = res.data;

    // If already joined, try leaving
    if (!joined) {
      res = await axiosConnector("POST", LEAVE_GROUP(groupId));
      joined = !res.data.left;
    }

    dispatch(toggleJoinGroup({ groupId, joined }));
    toast.success(joined ? "Joined group" : "Left group");
  } catch (error) {
    console.error("Toggle Join Group Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Group join/leave failed");
  } finally {
    dispatch(setLoading(false));
  }
};
