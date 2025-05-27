import { createSlice } from '@reduxjs/toolkit'

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    loading: false,
    friends: [],
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setFriends(state, action) {
      state.friends = action.payload
      state.error = null // Clear error on successful update
    },
    addFriend(state, action) {
      state.friends = [...state.friends, action.payload]
      state.error = null
    },
    removeFriend(state, action) {
      state.friends = state.friends.filter(friend => friend._id !== action.payload) // Use _id if your data uses that
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false // Stop loading on error
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setFriends, addFriend, removeFriend, setError, clearError } = friendsSlice.actions
export default friendsSlice.reducer
