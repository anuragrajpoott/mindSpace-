import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: false,
    notifications: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

export const {
  setLoading,
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
