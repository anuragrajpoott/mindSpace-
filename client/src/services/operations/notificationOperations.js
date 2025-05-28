import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setError,
  setNotifications,
  markRead,
  markAllRead,
  deleteNotification,
  addNotification,
} from "../../redux/Slices/notificationSlice";
import toast from "react-hot-toast";

const baseUrl = "/notifications";

// 🆕 Create notification
export const createNotification = (data) => async (dispatch) => {
  try {
    const res = await axiosConnector("POST", baseUrl, data);
    dispatch(addNotification(res.data.notification));
  } catch (error) {
    console.error("Notification creation failed", error.message);
  }
};

// 📥 Get all notifications
export const fetchNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", baseUrl);
    dispatch(setNotifications(res.data.notifications));
  } catch (error) {
    toast.error("Failed to load notifications");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Mark selected as read
export const markNotificationsAsRead = (ids) => async (dispatch) => {
  try {
    const res = await axiosConnector("PUT", `${baseUrl}/read`, { ids });
    dispatch(markRead(ids));
  } catch (error) {
    toast.error("Failed to mark as read");
    dispatch(setError(error.message));
  }
};

// ✅ Mark all as read
export const markAllNotificationsAsRead = () => async (dispatch) => {
  try {
    await axiosConnector("PUT", `${baseUrl}/read-all`);
    dispatch(markAllRead());
  } catch (error) {
    toast.error("Failed to mark all as read");
    dispatch(setError(error.message));
  }
};

// ❌ Delete notification
export const removeNotification = (notificationId) => async (dispatch) => {
  try {
    await axiosConnector("DELETE", `${baseUrl}/${notificationId}`);
    dispatch(deleteNotification(notificationId));
  } catch (error) {
    toast.error("Failed to delete notification");
    dispatch(setError(error.message));
  }
};
