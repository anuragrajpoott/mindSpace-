import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import {
  setLoading,
  setComments,
  addComment,
  updateComment,
  deleteComment,
  setError,
} from "../../redux/Slices/commentSlice";
import toast from "react-hot-toast";

const { COMMENTS } = endPoints; // COMMENTS = '/api/comments'

export const fetchCommentsByPost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${COMMENTS}/post/${postId}`);
    dispatch(setComments(res.data.comments));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch comments");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCommentsByUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${COMMENTS}/user/${userId}`);
    dispatch(setComments(res.data.comments));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch user comments");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createComment = (commentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", COMMENTS, commentData);
    dispatch(addComment(res.data.comment));
    toast.success("Comment added");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add comment");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editComment = (commentId, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${COMMENTS}/${commentId}`, updatedData);
    dispatch(updateComment(res.data.comment));
    toast.success("Comment updated");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update comment");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${COMMENTS}/${commentId}`);
    dispatch(deleteComment(commentId));
    toast.success("Comment deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete comment");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
