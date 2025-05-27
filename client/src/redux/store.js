import { configureStore } from '@reduxjs/toolkit'

import authReducer from './Slices/authSlice'
import postsReducer from './Slices/postSlice'
import commentsReducer from './Slices/commentSlice'
import likesReducer from './Slices/likeSlice'
import friendsReducer from './Slices/friendSlice'
import messagesReducer from './Slices/messageSlice'
import notificationsReducer from './Slices/notificationSlice'
import groupsReducer from './Slices/groupSlice';
import supportPostReducer from './Slices/supportPostSlice';
import moodLogReducer from './Slices/moodLogSlice';
import supportResourcesReducer from './Slices/supportResourceSlice';
import userReducer from "./Slices/userSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    friends: friendsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    groups: groupsReducer,
    supportPost: supportPostReducer,
    moodLog: moodLogReducer,
    supportResource: supportResourcesReducer,
    user : userReducer

  },
})

export default store
