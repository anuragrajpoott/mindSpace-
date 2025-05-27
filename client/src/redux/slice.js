import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null

// AUTH SLICE
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: initialUser,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload))
      } else {
        localStorage.removeItem("user")
      }
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

// POSTS SLICE
export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    setPostsLoading(state, action) {
      state.loading = action.payload
    },
    setPosts(state, action) {
      state.posts = action.payload
    },
    addPost(state, action) {
      state.posts.unshift(action.payload)
    },
    setPostsError(state, action) {
      state.error = action.payload
    },
    clearPostsError(state) {
      state.error = null
    },
  },
})

// COMMENTS SLICE
export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: false,
    comments: [],
    error: null,
  },
  reducers: {
    setCommentsLoading(state, action) {
      state.loading = action.payload
    },
    setComments(state, action) {
      state.comments = action.payload
    },
    addComment(state, action) {
      state.comments.push(action.payload)
    },
    setCommentsError(state, action) {
      state.error = action.payload
    },
    clearCommentsError(state) {
      state.error = null
    },
  },
})

// LIKES SLICE
export const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    loading: false,
    likes: [],
    error: null,
  },
  reducers: {
    setLikesLoading(state, action) {
      state.loading = action.payload
    },
    setLikes(state, action) {
      state.likes = action.payload
    },
    addLike(state, action) {
      state.likes.push(action.payload)
    },
    removeLike(state, action) {
      state.likes = state.likes.filter(like => like.id !== action.payload)
    },
    setLikesError(state, action) {
      state.error = action.payload
    },
    clearLikesError(state) {
      state.error = null
    },
  },
})

// FRIENDS SLICE
export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    loading: false,
    friends: [],
    error: null,
  },
  reducers: {
    setFriendsLoading(state, action) {
      state.loading = action.payload
    },
    setFriends(state, action) {
      state.friends = action.payload
    },
    addFriend(state, action) {
      state.friends.push(action.payload)
    },
    removeFriend(state, action) {
      state.friends = state.friends.filter(friend => friend.id !== action.payload)
    },
    setFriendsError(state, action) {
      state.error = action.payload
    },
    clearFriendsError(state) {
      state.error = null
    },
  },
})

// MESSAGES SLICE
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    loading: false,
    messages: [],
    error: null,
  },
  reducers: {
    setMessagesLoading(state, action) {
      state.loading = action.payload
    },
    setMessages(state, action) {
      state.messages = action.payload
    },
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
    setMessagesError(state, action) {
      state.error = action.payload
    },
    clearMessagesError(state) {
      state.error = null
    },
  },
})

// NOTIFICATIONS SLICE
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: false,
    notifications: [],
    error: null,
  },
  reducers: {
    setNotificationsLoading(state, action) {
      state.loading = action.payload
    },
    setNotifications(state, action) {
      state.notifications = action.payload
    },
    addNotification(state, action) {
      state.notifications.unshift(action.payload)
    },
    markNotificationRead(state, action) {
      const notif = state.notifications.find(n => n.id === action.payload)
      if (notif) notif.read = true
    },
    setNotificationsError(state, action) {
      state.error = action.payload
    },
    clearNotificationsError(state) {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setUser,
  setError,
  clearError,
} = authSlice.actions

export const {
  setPostsLoading,
  setPosts,
  addPost,
  setPostsError,
  clearPostsError,
} = postsSlice.actions

export const {
  setCommentsLoading,
  setComments,
  addComment,
  setCommentsError,
  clearCommentsError,
} = commentsSlice.actions

export const {
  setLikesLoading,
  setLikes,
  addLike,
  removeLike,
  setLikesError,
  clearLikesError,
} = likesSlice.actions

export const {
  setFriendsLoading,
  setFriends,
  addFriend,
  removeFriend,
  setFriendsError,
  clearFriendsError,
} = friendsSlice.actions

export const {
  setMessagesLoading,
  setMessages,
  addMessage,
  setMessagesError,
  clearMessagesError,
} = messagesSlice.actions

export const {
  setNotificationsLoading,
  setNotifications,
  addNotification,
  markNotificationRead,
  setNotificationsError,
  clearNotificationsError,
} = notificationsSlice.actions

// You can export reducers separately to combine in the store
export default {
  auth: authSlice.reducer,
  posts: postsSlice.reducer,
  comments: commentsSlice.reducer,
  likes: likesSlice.reducer,
  friends: friendsSlice.reducer,
  messages: messagesSlice.reducer,
  notifications: notificationsSlice.reducer,
}
