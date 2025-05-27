import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to log a new mood entry
export const logMood = createAsyncThunk(
  'mood/logMood',
  async (moodData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/support/mood', moodData);
      return res.data.moodLog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to fetch all mood logs (for history or analytics)
export const fetchMoodLogs = createAsyncThunk(
  'mood/fetchMoodLogs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/support/mood');
      return res.data.logs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(logMood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logMood.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new mood log to the front (latest first)
        state.logs.unshift(action.payload);
      })
      .addCase(logMood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMoodLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoodLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchMoodLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moodSlice.reducer;
