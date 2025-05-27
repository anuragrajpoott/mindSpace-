import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const supportPostSlice = createSlice({
  name: 'supportPost',
  initialState: {
    supportPost: [],
    loading: false,
  
  },
  reducers: {
    setLoading(state,action){
      state.loading = action.payload
    },
    setSupportPost(state,action){
      state.supportPost = action.payload
    }
  },

  },
);

export const {setLoading,setSupportPost} = supportPostSlice.actions
export default supportPostSlice.reducer;
