import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],        // List of posts
  loading: false,
  error: null,
  message: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // Add new post at the beginning
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex((post) => post._id === updatedPost._id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
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
    resetPostState: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetPostState,
} = postSlice.actions;

export default postSlice.reducer;
