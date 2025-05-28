// src/operations/supportPostOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setSupportPost } from "../../redux/Slices/supportPostSlice";
import toast from "react-hot-toast";

const {  CREATE_SUPPORT_POST } = endPoints;


export const createSupportPost = (content) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_SUPPORT_POST, { content });
    const { success, post } = res.data;

    if (!success) throw new Error("Failed to create post");

    dispatch(setSupportPost(post));
    toast.success("Support post created");
  } catch (error) {
    console.error("Create Support Post Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Failed to create post");
  } finally {
    dispatch(setLoading(false));
  }
};
