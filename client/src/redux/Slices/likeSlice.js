import { createSlice } from '@reduxjs/toolkit'

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    loading: false,
    likes: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setLikes(state, action) {
      state.likes = action.payload
    },
    addLike(state, action) {
      state.likes.push(action.payload)
    },
    removeLike(state, action) {
      state.likes = state.likes.filter(like => like.id !== action.payload)
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setLikes, addLike, removeLike, setError, clearError } = likesSlice.actions
export default likesSlice.reducer
