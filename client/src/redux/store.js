import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './Slices/postSlice'
import groupsReducer from './Slices/groupSlice';
import moodLogReducer from './Slices/moodLogSlice';
import resourceReducer from './Slices/resourceSlice';
import userReducer from "./Slices/userSlice"



const store = configureStore({
  reducer: {
    posts: postsReducer,
    groups: groupsReducer,
    moodLog: moodLogReducer,
    resource: resourceReducer,
    user : userReducer

  },
})

export default store
