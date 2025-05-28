import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setMessages,
  addMessage,
  removeMessageState,
  setError,
} from "../../redux/Slices/messageSlice";
import toast from "react-hot-toast";

const baseUrl = "/messages";

// Send a message (POST /)
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", baseUrl, messageData);
    dispatch(addMessage(res.data.message));
    toast.success("Message sent!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get messages with a user (GET /:otherUserId)
export const fetchMessagesWithUser = (otherUserId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/${otherUserId}`);
    dispatch(setMessages(res.data.messages));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch messages");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a message (DELETE /:messageId)
export const deleteMessage = (messageId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${baseUrl}/${messageId}`);
    dispatch(removeMessageState(messageId));
    toast.success("Message deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete message");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get recent chats (GET /recent/chats)
export const fetchRecentChats = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/recent/chats`);
    // Dispatch to set chats in the message slice or another slice
    // For example: dispatch(setRecentChats(res.data.chats))
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch recent chats");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
