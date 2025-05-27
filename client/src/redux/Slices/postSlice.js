import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      // Add new post to the beginning of posts array
      state.posts.unshift(action.payload);
    },
    likePost(state, action) {
      // Add new post to the beginning of posts array
      state.posts=action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoading, setPosts, addPost, setError, clearError,likePost } = postsSlice.actions;
export default postsSlice.reducer;
