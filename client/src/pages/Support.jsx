import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConnector from '../../api/axiosConnector';
import { GROUPS_API, TOGGLE_JOIN_API } from '../../api/apis';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosConnector('GET', GROUPS_API);
      if (!res.data.success) {
        return rejectWithValue(res.data.message || 'Failed to fetch groups');
      }
      return res.data.groups;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const toggleGroupJoin = createAsyncThunk(
  'groups/toggleGroupJoin',
  async (groupId, { rejectWithValue }) => {
    try {
      const res = await axiosConnector('POST', `${TOGGLE_JOIN_API}/${groupId}`);
      if (!res.data.success) {
        return rejectWithValue(res.data.message || 'Failed to toggle join status');
      }
      return { groupId, joined: res.data.joined };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);
