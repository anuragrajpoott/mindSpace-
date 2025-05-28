import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setNotifications } from "../../redux/Slices/notificationSlice";

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_NOTIFICATIONS);
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
    const res = await axiosConnector("POST", endPoints.MARK_NOTIFICATION_READ, { notificationId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Notification marked as read");
    dispatch(setNotifications(notificationId));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to mark notification");
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNotification = (notificationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.CREATE_NOTIFICATION, { notificationId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Notification created");
    dispatch(setNotifications(notificationId));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to create notification");
  } finally {
    dispatch(setLoading(false));
  }
};


export const DELETE_NOTIFICATION = (notificationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.DELETE_NOTIFICATION, { notificationId });
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Notification Deleted");
    dispatch(markNotificationRead(notificationId));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to delete notificatoin");
  } finally {
    dispatch(setLoading(false));
  }
};

