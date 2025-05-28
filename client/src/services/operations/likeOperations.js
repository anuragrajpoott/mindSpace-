import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading,setLikes } from "../../redux/Slices/likeSlice";

export const toggleLike = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.TOGGLE_LIKE, { postId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Post liked/unliked");
    // Optionally update likes in redux here if you manage likes state
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to like post");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getLikes = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.GET_LIKES, { postId });
    if (!res.data.success) throw new Error(res.data.message);

    setLikes(res.data.likes)

  } catch (error) {
    console.log("error getting likes", error)
  } finally {
    dispatch(setLoading(false));
  }
};

