// src/redux/slices/postSlice.js
import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],       // all posts
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    addPost(state, action) {
      state.posts.unshift(action.payload)
    },
    setUpdatedPost(state, action) {
      const updatedPost = action.payload
      const index = state.posts.findIndex(post => post._id === updatedPost._id)
      if (index !== -1) {
        state.posts[index] = updatedPost
      }
    },
    setDeletedPost(state, action) {
      const postId = action.payload
      state.posts = state.posts.filter(post => post._id !== postId)
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
    setSuccessMessage(state, action) {
      state.successMessage = action.payload
    },
    clearSuccessMessage(state) {
      state.successMessage = null
    },
  },
})

export const {
  setPosts,
  addPost,
  setUpdatedPost,
  setDeletedPost,
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
} = postSlice.actions

export default postSlice.reducer
