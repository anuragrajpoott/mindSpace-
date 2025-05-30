// src/redux/slices/groupSlice.js
import { createSlice } from '@reduxjs/toolkit'

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],           // all groups
    currentGroup: null,   // selected or active group details
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setGroups(state, action) {
      state.groups = action.payload
    },
    addGroup(state, action) {
      state.groups.push(action.payload)
    },
    setUpdatedGroup(state, action) {
      const updatedGroup = action.payload
      const index = state.groups.findIndex(g => g._id === updatedGroup._id)
      if (index !== -1) {
        state.groups[index] = updatedGroup
      }
      if (state.currentGroup && state.currentGroup._id === updatedGroup._id) {
        state.currentGroup = updatedGroup
      }
    },
    setDeletedGroup(state, action) {
      const groupId = action.payload
      state.groups = state.groups.filter(g => g._id !== groupId)
      if (state.currentGroup && state.currentGroup._id === groupId) {
        state.currentGroup = null
      }
    },
    setCurrentGroup(state, action) {
      state.currentGroup = action.payload
    },
    clearCurrentGroup(state) {
      state.currentGroup = null
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
  setGroups,
  addGroup,
  setUpdatedGroup,
  setDeletedGroup,
  setCurrentGroup,
  clearCurrentGroup,
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
} = groupSlice.actions

export default groupSlice.reducer
