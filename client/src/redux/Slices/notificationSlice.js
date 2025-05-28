import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],   // List of notifications for the user
  loading: false,
  error: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload); // New notifications on top
    },
    markNotificationsRead: (state, action) => {
      const readIds = action.payload; // Array of notification IDs marked read
      state.notifications = state.notifications.map((notif) =>
        readIds.includes(notif._id) ? { ...notif, read: true } : notif
      );
    },
    markAllRead: (state) => {
      state.notifications = state.notifications.map((notif) => ({
        ...notif,
        read: true,
      }));
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif._id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetNotificationState: (state) => {
      state.notifications = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setNotifications,
  addNotification,
  markNotificationsRead,
  markAllRead,
  deleteNotification,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetNotificationState,
} = notificationSlice.actions;

export default notificationSlice.reducer;
