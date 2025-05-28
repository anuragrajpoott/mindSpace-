import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],        // Comments list for a post
  userComments: [],    // Comments by a specific user
  loading: false,
  error: null,
  message: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setUserComments: (state, action) => {
      state.userComments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.comments[index] = action.payload;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(c => c._id !== action.payload);
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
    resetCommentsState: (state) => {
      state.comments = [];
      state.userComments = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setComments,
  setUserComments,
  addComment,
  updateComment,
  deleteComment,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetCommentsState,
} = commentsSlice.actions;

export default commentsSlice.reducer;
