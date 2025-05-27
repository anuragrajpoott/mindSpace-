import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    loading: false,
    likes: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLikes(state, action) {
      state.likes = action.payload;
    },
  },
});

export const { setLoading, setLikes} = likesSlice.actions;
export default likesSlice.reducer;
