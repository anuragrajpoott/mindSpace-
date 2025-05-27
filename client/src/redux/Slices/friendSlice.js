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
  },
})

export const { setLoading, setFriends } = friendsSlice.actions
export default friendsSlice.reducer
