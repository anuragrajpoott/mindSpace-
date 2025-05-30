// src/redux/slices/moodLogSlice.js
import { createSlice } from '@reduxjs/toolkit'

const moodLogSlice = createSlice({
  name: 'moodLog',
  initialState: {
    moodLogs: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setMoodLogs(state, action) {
      state.moodLogs = action.payload
    },
    addMoodLog(state, action) {
      state.moodLogs.push(action.payload)
    },
    setUpdatedMoodLog(state, action) {
      const updatedLog = action.payload
      const index = state.moodLogs.findIndex(log => log._id === updatedLog._id)
      if (index !== -1) {
        state.moodLogs[index] = updatedLog
      }
    },
    setDeletedMoodLog(state, action) {
      const logId = action.payload
      state.moodLogs = state.moodLogs.filter(log => log._id !== logId)
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload
    },
    clearSuccessMessage(state) {
      state.successMessage = null
    },
  },
})

export const {
  setMoodLogs,
  addMoodLog,
  setUpdatedMoodLog,
  setDeletedMoodLog,
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
} = moodLogSlice.actions

export default moodLogSlice.reducer
