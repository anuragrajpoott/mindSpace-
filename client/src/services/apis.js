export const endPoints = {
  // ========================
  // Auth
  // ========================
  SIGNUP: `/auth/sign-up`,
  LOGIN: `/auth/log-in`,
  SEARCH: `/auth/search`,
  SEND_OTP: `/auth/send-otp`,
  // ========================
  // User Profile
  // ========================
  GET_USER_PROFILE: (userId) => `/users/${userId}`,
  UPDATE_PROFILE: `/users`,
  DELETE_USER: `/users`,
  GET_ALL_USER: `/users`,

  // ========================
  // Posts
  // ========================
  CREATE_POST: `/posts`,
  GET_POSTS: `/posts`,
  DELETE_POST: (postId) => `/posts/${postId}`,
  UPDATE_POST:(postId)=>`/posts/${postId}`,
  DELETE_POST: (postId)=>`/posts/${postId}`,

  // ========================
  // Likes
  // ========================
  TOGGLE_LIKE: (postId) => `/likes/${postId}/toggle`,
  GET_LIKES: (postId) => `/likes/${postId}`,

  // ========================
  // Comments
  // ========================
  CREATE_COMMENT: `/comments`,
  GET_COMMENTS: (postId) => `/comments/post/${postId}`,
  DELETE_COMMENT: (commentId) => `/comments/${commentId}`,

  // ========================
  // Friends
  // ========================
  ADD_FRIEND: (friendId) => `/friends/request/${friendId}`,
  REMOVE_FRIEND: (friendId) => `/friends/remove/${friendId}`,
  ACCEPT_FRIEND: (friendId) => `/friends/accept/${friendId}`,

  // ========================
  // Messages
  // ========================
  SEND_MESSAGE: `/messages`,
  GET_MESSAGES_BETWEEN: (otherUserId) => `/messages/${otherUserId}`,
  MARK_MESSAGE_READ: (messageId) => `/messages/read/${messageId}`,
  DELETE_MESSAGE: (messageId) => `/messages/${messageId}`,

  // ========================
  // Notifications
  // ========================
  GET_NOTIFICATIONS: `/notifications`,
  CREATE_NOTIFICATION: `/notifications`,
  MARK_NOTIFICATION_READ: (notificationId) => `/notifications/read/${notificationId}`,
  DELETE_NOTIFICATION: (notificationId) => `/notifications/${notificationId}`,

  // ========================
  // Support Resources
  // ========================

  GET_SUPPORT_RESOURCES: `/support-resource`,


  // ========================
  // Support Posts (Community Support)
  // ========================
  CREATE_SUPPORT_POST: `/support-post`,

  // ========================
  // Mood Log
  // ========================
  MOOD_LOG: `/mood-log`,


  // ========================
  // Support Groups
  // ========================
  GET_GROUPS: `/group`,
  JOIN_GROUP: (groupId) => `/group/join/${groupId}`,
};
