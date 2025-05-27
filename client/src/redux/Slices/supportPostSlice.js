import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all support posts
export const fetchSupportPosts = createAsyncThunk(
  'posts/fetchSupportPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/support/posts');
      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create a new support post
export const createSupportPost = createAsyncThunk(
  'posts/createSupportPost',
  async (content, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/support/posts', { content });
      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define any synchronous reducers here if needed later
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchSupportPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSupportPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;
