import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    loading: false,
    messages: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setMessages(state, action) {
      state.messages = action.payload
    },
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setMessages, addMessage, setError, clearError } = messagesSlice.actions
export default messagesSlice.reducer
