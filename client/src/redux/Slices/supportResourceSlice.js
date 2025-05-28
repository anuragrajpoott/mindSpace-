


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resources: [],
  loading: false,
  error: null,
  message: null,
};

const supportResourceSlice = createSlice({
  name: "supportResource",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResources: (state, action) => {
      state.resources = action.payload;
    },
    addResource: (state, action) => {
      state.resources.unshift(action.payload);
    },
    updateResource: (state, action) => {
      const updatedResource = action.payload;
      const index = state.resources.findIndex((res) => res._id === updatedResource._id);
      if (index !== -1) {
        state.resources[index] = updatedResource;
      }
    },
    deleteResource: (state, action) => {
      state.resources = state.resources.filter((res) => res._id !== action.payload);
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
    resetSupportResourceState: (state) => {
      state.resources = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setResources,
  addResource,
  updateResource,
  deleteResource,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetSupportResourceState,
} = supportResourceSlice.actions;

export default supportResourceSlice.reducer;
