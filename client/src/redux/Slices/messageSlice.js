import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: {},  // { otherUserId: [messages] }
  recentChats: [],    // Array of recent chat summaries
  loading: false,
  error: null,
  message: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setConversation: (state, action) => {
      const { otherUserId, messages } = action.payload;
      state.conversations[otherUserId] = messages;
    },
    addMessage: (state, action) => {
      const { otherUserId, message } = action.payload;
      if (!state.conversations[otherUserId]) {
        state.conversations[otherUserId] = [];
      }
      state.conversations[otherUserId].push(message);
    },
    setRecentChats: (state, action) => {
      state.recentChats = action.payload;
    },
    deleteMessage: (state, action) => {
      const { otherUserId, messageId } = action.payload;
      if (state.conversations[otherUserId]) {
        state.conversations[otherUserId] = state.conversations[otherUserId].filter(
          (msg) => msg._id !== messageId
        );
      }
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
    resetMessagesState: (state) => {
      state.conversations = {};
      state.recentChats = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setConversation,
  addMessage,
  setRecentChats,
  deleteMessage,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetMessagesState,
} = messagesSlice.actions;

export default messagesSlice.reducer;
