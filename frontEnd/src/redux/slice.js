import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null

export const slice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: initialUser,
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
  },
})

export const { setLoading, setUser } = slice.actions

export default slice.reducer
