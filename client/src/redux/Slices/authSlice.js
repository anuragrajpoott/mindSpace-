import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: initialUser,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload))
      } else {
        localStorage.removeItem("user")
      }
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
    logout(state) {
      state.user = null
      localStorage.removeItem("user")
    }
  },
})

export const { setLoading, setUser, setError, clearError, logout } = authSlice.actions
export default authSlice.reducer
