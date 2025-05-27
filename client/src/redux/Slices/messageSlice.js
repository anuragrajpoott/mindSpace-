import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    loading: false,
    messages: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setLoading, setMessages} = messagesSlice.actions;
export default messagesSlice.reducer;
