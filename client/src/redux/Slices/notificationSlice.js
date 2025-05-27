import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: false,
    notifications: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    addNotification(state, action) {
      // Add new notification to the front of the array
      state.notifications.unshift(action.payload);
    },
    markNotificationRead(state, action) {
      // Mark notification as read by id
      const notif = state.notifications.find(n => n.id === action.payload || n._id === action.payload);
      if (notif) notif.read = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setNotifications,
  addNotification,
  markNotificationRead,
  setError,
  clearError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
