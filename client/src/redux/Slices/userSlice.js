import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    loading: false,
  },
  reducers: {
    // Add synchronous reducers here if needed in the future
    setLoading(state,action){
      state.loading = action.payload
    },
    setUser(state,action){
      state.user = action.payload
    }
  },

  },
);

export const {setLoading,setUser} = userSlice.actions
export default userSlice.reducer;
