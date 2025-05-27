import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setComments, addComment } from "../../redux/slice";

export const addComment = (postId, comment) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.COMMENT_POST_API, { postId, comment });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Comment added");
    dispatch(addComment(res.data.comment));
  } catch (error) {
    toast.error(error.message || "Failed to add comment");
  }
  dispatch(setLoading(false));
};

export const getComments = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_COMMENTS_API, null, null, { postId });
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setComments(res.data.comments));
  } catch (error) {
    toast.error(error.message || "Failed to fetch comments");
  }
  dispatch(setLoading(false));
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.DELETE_COMMENT_API}/${commentId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Comment deleted");
    // Optionally refresh comments list or remove from store
  } catch (error) {
    toast.error(error.message || "Failed to delete comment");
  }
  dispatch(setLoading(false));
};
