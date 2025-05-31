// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  searchResults : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearSearchResults(state) {
      state.searchResults = []
    },
  },
});

export const {
  setUser,
  setToken,
  clearUser,
  setLoading,
  setError,
  clearError,
  setProfile,
  setSearchResults,
  clearSearchResults
} = userSlice.actions;

export default userSlice.reducer;
