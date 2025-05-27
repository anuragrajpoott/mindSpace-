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
    },
    addFriend(state, action) {
      state.friends.push(action.payload)
    },
    removeFriend(state, action) {
      state.friends = state.friends.filter(friend => friend.id !== action.payload)
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { setLoading, setFriends, addFriend, removeFriend, setError, clearError } = friendsSlice.actions
export default friendsSlice.reducer
