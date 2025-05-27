import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    logs: [],
    loading: false,
  },
  reducers: {
    setLoading(state,action){
      state.loading = action.payload
    },
    setLogs(state,action){
      state.logs = action.payload
    }
  },

});

export const {setLoading,setLogs} = moodSlice.actions
export default moodSlice.reducer;
