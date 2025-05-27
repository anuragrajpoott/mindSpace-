import { createSlice } from '@reduxjs/toolkit';



const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    loading: false,

  },
  reducers: {
    setLoading(state,action){
      state.loading = action.payload
    },
    setGroups(state,action){
      state.groups = action.payload
    }
  },

  },
);

export const {setLoading,setGroups} = groupsSlice.actions
export default groupsSlice.reducer;
