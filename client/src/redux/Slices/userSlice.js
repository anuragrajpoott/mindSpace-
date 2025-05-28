import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,     // detailed profile of a user
  allUsers: [],      // list of all users
  loading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
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
    resetUserState: (state) => {
      state.profile = null;
      state.allUsers = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setProfile,
  setAllUsers,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
