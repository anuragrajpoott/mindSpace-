// src/redux/slices/resourceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resources: [],
  loading: false,
  error: null,
  successMessage: null,
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResources(state, action) {
      state.resources = action.payload;
    },
    addResource(state, action) {
      state.resources.push(action.payload);
    },
    setUpdatedResource(state, action) {
      const updated = action.payload;
      const index = state.resources.findIndex(r => r._id === updated._id);
      if (index !== -1) {
        state.resources[index] = updated;
      }
    },
    setDeletedResource(state, action) {
      const id = action.payload;
      state.resources = state.resources.filter(r => r._id !== id);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
});

export const {
  setResources,
  addResource,
  setUpdatedResource,
  setDeletedResource,
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
} = resourceSlice.actions;

export default resourceSlice.reducer;
