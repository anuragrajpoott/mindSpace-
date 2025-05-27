import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setPosts, addPost } from "../../redux/slice";

const { CREATE_POST_API, GET_POSTS_API, DELETE_POST_API, EDIT_POST_API } = endPoints;

export const createPost = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_POST_API, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post created");
    dispatch(addPost(res.data.post));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to create post");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_POSTS_API);
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
    const res = await axiosConnector("DELETE", `${DELETE_POST_API}/${postId}`);
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
    const res = await axiosConnector("PUT", `${EDIT_POST_API}/${postId}`, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post updated");
    dispatch(getPosts());
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to update post");
  } finally {
    dispatch(setLoading(false));
  }
};
