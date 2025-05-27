import { createSlice } from '@reduxjs/toolkit';


const supportResourceSlice = createSlice({
  name: 'supportResource',
  initialState: {
    supportResource: [],
    loading: false,
  },
  reducers: {
    // Add synchronous reducers here if needed in the future
    setLoading(state,action){
      state.loading = action.payload
    },
    setSupportResouce(state,action){
      state.supportResource = action.payload
    }
  },

  },
);

export const {setLoading,setSupportResouce} = supportResourceSlice.actions
export default supportResourceSlice.reducer;
