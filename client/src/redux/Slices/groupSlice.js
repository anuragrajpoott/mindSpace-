import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],            // All groups list
  currentGroup: null,    // Selected group details
  members: [],           // Members of the selected group
  loading: false,
  error: null,
  message: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action) => {
      const index = state.groups.findIndex(g => g._id === action.payload._id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
      if (state.currentGroup && state.currentGroup._id === action.payload._id) {
        state.currentGroup = action.payload;
      }
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(group => group._id !== action.payload);
      if (state.currentGroup && state.currentGroup._id === action.payload) {
        state.currentGroup = null;
        state.members = [];
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetGroupsState: (state) => {
      state.groups = [];
      state.currentGroup = null;
      state.members = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  setLoading,
  setGroups,
  setCurrentGroup,
  setMembers,
  addGroup,
  updateGroup,
  removeGroup,
  setError,
  setMessage,
  clearError,
  clearMessage,
  resetGroupsState,
} = groupsSlice.actions;

export default groupsSlice.reducer;
