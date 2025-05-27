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
      state.error = null // clear error on successful load
    },
    addComment(state, action) {
      state.comments = [...state.comments, action.payload]
      state.error = null // clear error on successful add
    },
    removeComment(state, action) {
      state.comments = state.comments.filter(comment => comment._id !== action.payload)
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setComments, addComment, removeComment, setError, clearError } = commentsSlice.actions
export default commentsSlice.reducer
