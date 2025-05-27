import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setFriends } from "../../redux/slice";

export const sendRequest = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.ADD_FRIEND_API, { friendId });
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
    const res = await axiosConnector("POST", endPoints.ACCEPT_FRIEND_REQUEST_API, { requestId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend request accepted");
    // Refresh the friend list after acceptance
    dispatch(getFriends());
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to accept friend request");
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFriend = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.REMOVE_FRIEND_API}/${friendId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend removed");
    // Refresh the friend list after removal
    dispatch(getFriends());
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to remove friend");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getFriends = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_FRIENDS_API);
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setFriends(res.data.friends));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch friends");
  } finally {
    dispatch(setLoading(false));
  }
};
