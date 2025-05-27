import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: false,
    comments: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setComments(state, action) {
      state.comments = action.payload
    },
    addComment(state, action) {
      state.comments.push(action.payload)
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setComments, addComment, setError, clearError } = commentsSlice.actions
export default commentsSlice.reducer
