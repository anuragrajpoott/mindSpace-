import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsList: [],       // Accepted friends
  pendingRequests: [],   // Incoming friend requests to accept/decline
  loading: false,
  error: null,
  message: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setPendingRequests: (state, action) => {
      state.pendingRequests = action.payload;
    },
    addFriend: (state, action) => {
      state.friendsList.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friendsList = state.friendsList.filter(
        (friend) => friend._id !== action.payload
      );
    },
    addPendingRequest: (state, action) => {
      state.pendingRequests.push(action.payload);
    },
    removePendingRequest: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request._id !== action.payload
      );
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
    resetFriendsState: (state) => {
      state.friendsList = [];
      state.pendingRequests = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setFriendsList,
  setPendingRequests,
  addFriend,
  removeFriend,
  addPendingRequest,
  removePendingRequest,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetFriendsState,
} = friendsSlice.actions;

export default friendsSlice.reducer;
