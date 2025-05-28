import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likesByPost: {},   // { postId: [userIds...] }
  userLikes: {},     // { postId: boolean } — whether current user liked post
  loading: false,
  error: null,
  message: null,
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLikesByPost: (state, action) => {
      const { postId, likes } = action.payload;
      state.likesByPost[postId] = likes;
    },
    setUserLikeStatus: (state, action) => {
      const { postId, liked } = action.payload;
      state.userLikes[postId] = liked;
    },
    toggleUserLike: (state, action) => {
      const postId = action.payload;
      state.userLikes[postId] = !state.userLikes[postId];
      // Optional: update likesByPost accordingly if needed
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
    resetLikesState: (state) => {
      state.likesByPost = {};
      state.userLikes = {};
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setLikesByPost,
  setUserLikeStatus,
  toggleUserLike,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetLikesState,
} = likesSlice.actions;

export default likesSlice.reducer;
