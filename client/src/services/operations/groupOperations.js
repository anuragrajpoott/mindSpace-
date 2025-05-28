// src/operations/groupOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setGroups } from "../../redux/Slices/groupSlice";
import toast from "react-hot-toast";

const { GET_GROUPS, JOIN_GROUP } = endPoints;

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

export const toggleGroupJoin = (groupId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Try joining first
    let res = await axiosConnector("POST", JOIN_GROUP(groupId));
    let { joined } = res.data;

    toast.success("Joined group");
  } catch (error) {
    console.error("Toggle Join Group Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Group join/leave failed");
  } finally {
    dispatch(setLoading(false));
  }
};
