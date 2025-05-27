import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setMessages, addMessage } from "../../redux/slice";

export const sendMessage = (receiverId, message) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.SEND_MESSAGE_API, { receiverId, message });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Message sent");
    dispatch(addMessage(res.data.message));
  } catch (error) {
    toast.error(error.message || "Failed to send message");
  }
  dispatch(setLoading(false));
};

export const getMessages = (conversationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_MESSAGES_API, null, null, { conversationId });
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setMessages(res.data.messages));
  } catch (error) {
    toast.error(error.message || "Failed to fetch messages");
  }
  dispatch(setLoading(false));
};
