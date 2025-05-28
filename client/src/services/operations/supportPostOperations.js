import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setSupportPosts,
  addSupportPost,
  updateSupportPostState,
  deleteSupportPostState,
  setError,
} from "../../redux/Slices/supportPostSlice";
import toast from "react-hot-toast";

const baseUrl = "/support-posts";

// Create support post (POST /)
export const createSupportPost = (postData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", baseUrl, postData);
    dispatch(addSupportPost(res.data.post));
    toast.success("Support post created");
  } catch (error) {
    toast.error(error.response?.data?.message || "Creation failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get all support posts (GET /)
export const fetchSupportPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", baseUrl);
    dispatch(setSupportPosts(res.data.posts));
  } catch (error) {
    toast.error("Failed to fetch support posts");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get support post by ID (GET /:id)
export const fetchSupportPostById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/${id}`);
    dispatch(addSupportPost(res.data.post)); // Optional usage
  } catch (error) {
    toast.error("Failed to fetch support post");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get posts by user (GET /user/:userId)
export const fetchSupportPostsByUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/user/${userId}`);
    dispatch(setSupportPosts(res.data.posts));
  } catch (error) {
    toast.error("Failed to load user posts");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update support post (PUT /:id)
export const updateSupportPost = (id, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${baseUrl}/${id}`, updatedData);
    dispatch(updateSupportPostState(res.data.updatedPost));
    toast.success("Post updated");
  } catch (error) {
    toast.error("Update failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete support post (DELETE /:id)
export const deleteSupportPost = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${baseUrl}/${id}`);
    dispatch(deleteSupportPostState(id));
    toast.success("Post deleted");
  } catch (error) {
    toast.error("Delete failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
