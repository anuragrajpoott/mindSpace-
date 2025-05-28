import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moodLogs: [],       // List of mood log entries
  moodStats: null,    // Stats like averages, counts, etc.
  loading: false,
  error: null,
  message: null,
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMoodLogs: (state, action) => {
      state.moodLogs = action.payload;
    },
    addMoodLog: (state, action) => {
      state.moodLogs.push(action.payload);
    },
    updateMoodLog: (state, action) => {
      const updatedLog = action.payload;
      const index = state.moodLogs.findIndex((log) => log._id === updatedLog._id);
      if (index !== -1) {
        state.moodLogs[index] = updatedLog;
      }
    },
    deleteMoodLog: (state, action) => {
      state.moodLogs = state.moodLogs.filter((log) => log._id !== action.payload);
    },
    setMoodStats: (state, action) => {
      state.moodStats = action.payload;
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
    resetMoodState: (state) => {
      state.moodLogs = [];
      state.moodStats = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setMoodLogs,
  addMoodLog,
  updateMoodLog,
  deleteMoodLog,
  setMoodStats,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetMoodState,
} = moodSlice.actions;

export default moodSlice.reducer;
