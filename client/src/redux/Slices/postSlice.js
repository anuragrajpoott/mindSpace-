import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setPosts(state, action) {
      state.posts = action.payload
    },
    addPost(state, action) {
      state.posts.unshift(action.payload)
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setPosts, addPost, setError, clearError } = postsSlice.actions
export default postsSlice.reducer
