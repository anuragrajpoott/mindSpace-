import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import {
  setLoading,
  setLikes,
  toggleLikeState,
  setError,
} from "../../redux/Slices/likeSlice";
import toast from "react-hot-toast";

const { LIKES } = endPoints; // LIKES = '/api/likes'

// Toggle like on a post (POST /post/:postId)
export const toggleLike = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `${LIKES}/post/${postId}`);
    dispatch(toggleLikeState(res.data.like));
    toast.success(res.data.message || "Like toggled");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to toggle like");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get if a post is liked by user (GET /user/:userId) — might be used to check like state
export const fetchUserLikes = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${LIKES}/user/${userId}`);
    dispatch(setLikes(res.data.likes));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch likes");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get all likes for a post (GET /post/:postId)
export const fetchLikesByPost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${LIKES}/post/${postId}`);
    dispatch(setLikes(res.data.likes));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch likes for post");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
