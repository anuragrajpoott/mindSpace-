import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import {
  setLoading,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setError,
} from "../../redux/Slices/postSlice";
import toast from "react-hot-toast";

const { GET_POSTS } = endPoints; // POSTS = '/api/posts'

export const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_POSTS );
    dispatch(setPosts(res.data.posts));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch posts");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createPost = (postData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", POSTS, postData);
    dispatch(addPost(res.data.post));
    toast.success("Post created");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create post");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editPost = (postId, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${POSTS}/${postId}`, updatedData);
    dispatch(updatePost(res.data.post));
    toast.success("Post updated");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update post");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removePost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${POSTS}/${postId}`);
    dispatch(deletePost(postId));
    toast.success("Post deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete post");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchPostById = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${POSTS}/${postId}`);
    // You can handle this single post differently if needed
    // For now, let's just add or update it in the store
    dispatch(updatePost(res.data.post));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch post");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
