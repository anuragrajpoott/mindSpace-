import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: false,
    comments: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setComments(state, action) {
      state.comments = action.payload
      
    },
  },
})

export const { setLoading, setComments } = commentsSlice.actions
export default commentsSlice.reducer
