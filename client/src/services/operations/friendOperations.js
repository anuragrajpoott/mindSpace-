import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import {
  setLoading,
  setFriends,
  addFriendState,
  removeFriendState,
  setPendingRequests,
  setError,
} from "../../redux/Slices/friendSlice";
import toast from "react-hot-toast";

const {
  ADD_FRIEND,
  REMOVE_FRIEND,
  ACCEPT_FRIEND,
  DECLINE_FRIEND,
  GET_FRIEND_LIST,
  GET_PENDING_FRIEND_REQUESTS,
} = endPoints;

// Send friend request (POST /request/:userId)
export const sendFriendRequest = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `/friends/request/${userId}`);
    toast.success(res.data.message || "Friend request sent");
    dispatch(addFriendState(res.data.friendRequest));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send friend request");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Accept friend request (POST /accept/:requestId)
export const acceptFriendRequest = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `/friends/accept/${requestId}`);
    toast.success(res.data.message || "Friend request accepted");
    dispatch(addFriendState(res.data.friend));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to accept friend request");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Decline friend request (POST /decline/:requestId)
export const declineFriendRequest = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `/friends/decline/${requestId}`);
    toast.success(res.data.message || "Friend request declined");
    dispatch(setPendingRequests((prev) => prev.filter(req => req.id !== requestId)));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to decline friend request");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Remove friend (DELETE /remove/:friendId)
export const removeFriend = (friendId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `/friends/remove/${friendId}`);
    toast.success(res.data.message || "Friend removed");
    dispatch(removeFriendState(friendId));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to remove friend");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get friend list (GET /list)
export const fetchFriends = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `/friends/list`);
    dispatch(setFriends(res.data.friends));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch friends");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get pending friend requests (GET /pending)
export const fetchPendingRequests = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `/friends/pending`);
    dispatch(setPendingRequests(res.data.requests));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch pending requests");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
