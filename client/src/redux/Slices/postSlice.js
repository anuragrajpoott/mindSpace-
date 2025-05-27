import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { setLoading, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
