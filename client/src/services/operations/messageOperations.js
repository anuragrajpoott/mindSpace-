import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setMessages } from "../../redux/Slices/messageSlice";

export const sendMessage = (receiverId, message) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.SEND_MESSAGE, { receiverId, message });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Message sent");
    dispatch(setMessages(res.data.message));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to send message");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getMessages = (conversationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_MESSAGES_BETWEEN, null, null, { conversationId });
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setMessages(res.data.messages));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch messages");
  } finally {
    dispatch(setLoading(false));
  }
};
