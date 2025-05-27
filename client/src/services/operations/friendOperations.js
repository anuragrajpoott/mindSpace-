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
    // Optionally update friend requests in store
  } catch (error) {
    toast.error(error.message || "Failed to send friend request");
  }
  dispatch(setLoading(false));
};

export const acceptRequest = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.ACCEPT_FRIEND_REQUEST_API, { requestId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend request accepted");
    dispatch(getFriends());
  } catch (error) {
    toast.error(error.message || "Failed to accept friend request");
  }
  dispatch(setLoading(false));
};

export const removeFriend = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${endPoints.REMOVE_FRIEND_API}/${friendId}`);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Friend removed");
    dispatch(getFriends());
  } catch (error) {
    toast.error(error.message || "Failed to remove friend");
  }
  dispatch(setLoading(false));
};

export const getFriends = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_FRIENDS_API);
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setFriends(res.data.friends));
  } catch (error) {
    toast.error(error.message || "Failed to fetch friends");
  }
  dispatch(setLoading(false));
};
