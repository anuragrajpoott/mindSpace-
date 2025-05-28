import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setPosts } from "../../redux/slice";

const { CREATE_POST, GET_POSTS, DELETE_POST, UPDATE_POST } = endPoints;

export const createPost = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_POST, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post created");
    dispatch(setPosts(res.data.post));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to create post");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", DELETE_POST);
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setPosts(res.data.posts));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch posts");
  } finally {
    dispatch(setLoading(false));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${DELETE_POST}/${postId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post deleted");
    dispatch(getPosts());
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to delete post");
  } finally {
    dispatch(setLoading(false));
  }
};

export const editPost = (postId, formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${UPDATE_POST}/${postId}`, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post updated");
    dispatch(getPosts());
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to update post");
  } finally {
    dispatch(setLoading(false));
  }
};
