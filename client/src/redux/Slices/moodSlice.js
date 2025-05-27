import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk: Log mood
export const logMood = createAsyncThunk('mood/logMood', async (moodData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/support/mood', moodData);
    return res.data.moodLog;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Thunk: Fetch mood logs (optional, for mood history page)
export const fetchMoodLogs = createAsyncThunk('mood/fetchMoodLogs', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/support/mood');
    return res.data.logs;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logMood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logMood.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.unshift(action.payload); // Add latest mood to top
      })
      .addCase(logMood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMoodLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
      });
  },
});

export default moodSlice.reducer;
