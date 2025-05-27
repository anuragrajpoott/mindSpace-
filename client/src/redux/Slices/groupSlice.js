import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/support/groups');
    return res.data.groups;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const toggleGroupJoin = createAsyncThunk('groups/toggleGroupJoin', async (groupId, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/api/support/groups/${groupId}/toggle-join`);
    return { groupId, joined: res.data.joined };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState: { groups: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false; state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(toggleGroupJoin.fulfilled, (state, action) => {
        const { groupId, joined } = action.payload;
        const group = state.groups.find(g => g._id === groupId);
        if (group) {
          if (joined) group.members.push('me'); // or better track actual user id
          else group.members = group.members.filter(m => m !== 'me');
        }
      });
  }
});

export default groupsSlice.reducer;
