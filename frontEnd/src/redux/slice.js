import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload
    },
    setUser(state, value) {
      state.user = value.payload
    },
  },
})

export const { setLoading, setUser } = slice.actions

export default slice.reducer