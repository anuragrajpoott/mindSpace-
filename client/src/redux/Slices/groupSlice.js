import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all groups
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/support/groups');
      return res.data.groups;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Toggle join/leave group
export const toggleGroupJoin = createAsyncThunk(
  'groups/toggleGroupJoin',
  async (groupId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/support/groups/${groupId}/toggle-join`);
      return { groupId, joined: res.data.joined };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch groups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle join/leave group
      .addCase(toggleGroupJoin.fulfilled, (state, action) => {
        const { groupId, joined } = action.payload;
        const group = state.groups.find((g) => g._id === groupId);
        if (group) {
          if (joined) {
            // Add current user ID instead of placeholder 'me' if possible
            group.members.push('me');
          } else {
            group.members = group.members.filter((member) => member !== 'me');
          }
        }
      });
  },
});

export default groupsSlice.reducer;
