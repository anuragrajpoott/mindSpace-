import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setPosts, addPost } from "../../redux/slice";

const { CREATE_POST_API, GET_POSTS_API } = endPoints;

export const createPost = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_POST_API, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post created");
    dispatch(addPost(res.data.post));
  } catch (error) {
    toast.error(error.message || "Failed to create post");
  }
  dispatch(setLoading(false));
};

export const getPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_POSTS_API);
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setPosts(res.data.posts));
  } catch (error) {
    toast.error(error.message || "Failed to fetch posts");
  }
  dispatch(setLoading(false));
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.DELETE_POST_API}/${postId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post deleted");
    dispatch(getPosts());
  } catch (error) {
    toast.error(error.message || "Failed to delete post");
  }
  dispatch(setLoading(false));
};

export const editPost = (postId, formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${endPoints.EDIT_POST_API}/${postId}`, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post updated");
    dispatch(getPosts());
  } catch (error) {
    toast.error(error.message || "Failed to update post");
  }
  dispatch(setLoading(false));
};
