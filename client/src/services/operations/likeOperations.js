import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading } from "../../redux/slice";

export const likePost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.LIKE_POST_API, { postId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post liked");
    // Optionally dispatch an action to update likes in store
  } catch (error) {
    toast.error(error.message || "Failed to like post");
  }
  dispatch(setLoading(false));
};

export const unlikePost = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.UNLIKE_POST_API, { postId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post unliked");
    // Optionally dispatch an action to update likes in store
  } catch (error) {
    toast.error(error.message || "Failed to unlike post");
  }
  dispatch(setLoading(false));
};
