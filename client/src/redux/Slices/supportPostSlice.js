import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supportPosts: [],
  loading: false,
  error: null,
  message: null,
};

const supportPostSlice = createSlice({
  name: "supportPost",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSupportPosts: (state, action) => {
      state.supportPosts = action.payload;
    },
    addSupportPost: (state, action) => {
      state.supportPosts.unshift(action.payload);
    },
    updateSupportPost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.supportPosts.findIndex((post) => post._id === updatedPost._id);
      if (index !== -1) {
        state.supportPosts[index] = updatedPost;
      }
    },
    deleteSupportPost: (state, action) => {
      state.supportPosts = state.supportPosts.filter((post) => post._id !== action.payload);
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
    resetSupportPostState: (state) => {
      state.supportPosts = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setSupportPosts,
  addSupportPost,
  updateSupportPost,
  deleteSupportPost,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetSupportPostState,
} = supportPostSlice.actions;

export default supportPostSlice.reducer;