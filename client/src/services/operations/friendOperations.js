import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setFriends } from "../../redux/Slices/friendSlice";

export const sendRequest = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.ADD_FRIEND, { friendId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend request sent");
    // You can dispatch an action here to update friend requests if you manage them in store
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to send friend request");
  } finally {
    dispatch(setLoading(false));
  }
};

export const acceptRequest = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.ACCEPT_FRIEND, { requestId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend request accepted");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to accept friend request");
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFriend = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.REMOVE_FRIEND}/${friendId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend removed");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to remove friend");
  } finally {
    dispatch(setLoading(false));
  }
};


