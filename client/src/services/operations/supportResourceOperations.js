// src/operations/supportResourceOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setSupportResouce } from "../../redux/Slices/supportResourceSlice";
import toast from "react-hot-toast";

const { GET_SUPPORT_RESOURCES } = endPoints;

/**
 * Fetch support resources (e.g., hotlines, guides, etc.)
 */
export const fetchResources = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_SUPPORT_RESOURCES);
    const { success, resources } = res.data;

    if (!success) throw new Error("Failed to fetch support resources");

    dispatch(setSupportResouce(resources));
  } catch (error) {
    console.error("Fetch Resources Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Unable to load resources");
  } finally {
    dispatch(setLoading(false));
  }
};
