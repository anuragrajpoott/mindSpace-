// src/operations/supportPostOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setSupportPosts, addSupportPost } from "../../redux/Slices/supportPostSlice";
import toast from "react-hot-toast";

const { GET_SUPPORT_POSTS, CREATE_SUPPORT_POST } = endPoints;

/**
 * Fetch all support posts
 */
export const fetchSupportPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_SUPPORT_POSTS);
    const { success, posts } = res.data;

    if (!success) throw new Error("Failed to fetch support posts");

    dispatch(setSupportPosts(posts));
  } catch (error) {
    console.error("Fetch Support Posts Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Failed to load support posts");
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Create a new support post
 * @param {string} content - Text content of the post
 */
export const createSupportPost = (content) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_SUPPORT_POST, { content });
    const { success, post } = res.data;

    if (!success) throw new Error("Failed to create post");

    dispatch(addSupportPost(post));
    toast.success("Support post created");
  } catch (error) {
    console.error("Create Support Post Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Failed to create post");
  } finally {
    dispatch(setLoading(false));
  }
};
