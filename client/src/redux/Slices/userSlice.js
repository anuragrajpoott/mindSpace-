// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem("token", JSON.stringify("token")) || null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      state.error = null
    },
    setUser(state, action) {
      state.user = action.payload
      state.error = null
    },
    clearUser(state) {
      state.user = null
      state.error = null
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
    setProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const {
  setUser,
  setToken,
  clearUser,
  setLoading,
  setError,
  clearError,
  setProfile,
} = userSlice.actions

export default userSlice.reducer
