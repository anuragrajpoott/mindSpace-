import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setComments} from "../../redux/Slices/commentSlice";

export const addComment = (postId, commentText) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.CREATE_COMMENT, { postId, comment: commentText });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Comment added");
    dispatch(addCommentAction(res.data.comment));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to add comment");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getComments = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_COMMENTS, null, null, { postId });
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setComments(res.data.comments));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch comments");
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.DELETE_COMMENT}/${commentId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Comment deleted");
    dispatch(removeComment(commentId));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to delete comment");
  } finally {
    dispatch(setLoading(false));
  }
};
