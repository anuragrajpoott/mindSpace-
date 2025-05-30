// src/redux/slices/resourceSlice.js
import { createSlice } from '@reduxjs/toolkit'

const resourceSlice = createSlice({
  name: 'resource',
  initialState: {
    resources: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setResources(state, action) {
      state.resources = action.payload
    },
    addResource(state, action) {
      state.resources.push(action.payload)
    },
    setUpdatedResource(state, action) {
      const updatedResource = action.payload
      const index = state.resources.findIndex(r => r._id === updatedResource._id)
      if (index !== -1) {
        state.resources[index] = updatedResource
      }
    },
    setDeleteResource(state, action) {
      const resourceId = action.payload
      state.resources = state.resources.filter(r => r._id !== resourceId)
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
  setResources,
  addResource,
  setUpdatedResource,
  setDeleteResource,
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
} = resourceSlice.actions

export default resourceSlice.reducer
