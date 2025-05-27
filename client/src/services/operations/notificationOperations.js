import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setNotifications, markNotificationRead } from "../../redux/slice";

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_NOTIFICATIONS_API);
    if (!res.data.success) throw new Error(res.data.message);
    dispatch(setNotifications(res.data.notifications));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch notifications");
  } finally {
    dispatch(setLoading(false));
  }
};

export const markAsRead = (notificationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.MARK_NOTIFICATION_READ_API, { notificationId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Notification marked as read");
    dispatch(markNotificationRead(notificationId));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to mark notification");
  } finally {
    dispatch(setLoading(false));
  }
};
