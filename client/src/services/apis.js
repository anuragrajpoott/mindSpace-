export const endPoints = {
  // ========================
  // Auth
  // ========================
  SIGNUP: `/auth/sign-up`,
  LOGIN: `/auth/log-in`,
  LOGOUT: `/auth/logout`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
  UPDATE_PASSWORD: `/auth/update-password`,
  GET_CURRENT_USER: `/auth/me`,

  // ========================
  // User Profile
  // ========================
  GET_USER_PROFILE: (userId) => `/users/${userId}`,
  UPDATE_PROFILE: `/users/me/profile`,
  DELETE_USER: `/users/me`,
  GET_ALL_USERS: `/users`,

  // ========================
  // Posts
  // ========================
  CREATE_POST: `/posts`,
  GET_POSTS: `/posts`,
  GET_POST_BY_ID: (postId) => `/posts/${postId}`,
  UPDATE_POST: (postId) => `/posts/${postId}`,
  DELETE_POST: (postId) => `/posts/${postId}`,

  // ========================
  // Likes
  // ========================
  TOGGLE_LIKE: (postId) => `/likes/post/${postId}`,
  IS_LIKED_BY_USER: (userId) => `/likes/user/${userId}`,
  GET_LIKES_FOR_POST: (postId) => `/likes/post/${postId}`,

  // ========================
  // Comments
  // ========================
  CREATE_COMMENT: `/comments`,
  GET_COMMENTS_BY_POST: (postId) => `/comments/post/${postId}`,
  GET_COMMENTS_BY_USER: (userId) => `/comments/user/${userId}`,
  UPDATE_COMMENT: (commentId) => `/comments/${commentId}`,
  DELETE_COMMENT: (commentId) => `/comments/${commentId}`,

  // ========================
  // Friends
  // ========================
  SEND_FRIEND_REQUEST: (userId) => `/friends/request/${userId}`,
  ACCEPT_FRIEND_REQUEST: (requestId) => `/friends/accept/${requestId}`,
  REJECT_FRIEND_REQUEST: (requestId) => `/friends/decline/${requestId}`,
  REMOVE_FRIEND: (friendId) => `/friends/remove/${friendId}`,
  GET_FRIEND_LIST: `/friends/list`,
  GET_PENDING_REQUESTS: `/friends/pending`,

  // ========================
  // Messages
  // ========================
  SEND_MESSAGE: `/messages`,
  GET_MESSAGES_WITH_USER: (otherUserId) => `/messages/${otherUserId}`,
  DELETE_MESSAGE: (messageId) => `/messages/${messageId}`,
  GET_RECENT_CONVERSATIONS: `/messages/recent/chats`,

  // ========================
  // Notifications
  // ========================
  CREATE_NOTIFICATION: `/notifications`,
  GET_NOTIFICATIONS: `/notifications`,
  MARK_NOTIFICATIONS_READ: `/notifications/read`,
  MARK_ALL_NOTIFICATIONS_READ: `/notifications/real-all`,
  DELETE_NOTIFICATION: (notificationId) => `/notifications/${notificationId}`,

  // ========================
  // Support Resources
  // ========================
  CREATE_SUPPORT_RESOURCE: `/support-resource`,
  GET_SUPPORT_RESOURCES: `/support-resource`,
  GET_SUPPORT_RESOURCE_BY_ID: (id) => `/support-resource/${id}`,
  GET_SUPPORT_RESOURCES_BY_CATEGORY: (category) => `/support-resource/category/${category}`,
  SEARCH_SUPPORT_RESOURCES: (keyword) => `/support-resource/search/${keyword}`,
  UPDATE_SUPPORT_RESOURCE: (id) => `/support-resource/${id}`,
  DELETE_SUPPORT_RESOURCE: (id) => `/support-resource/${id}`,

  // ========================
  // Support Posts
  // ========================
  CREATE_SUPPORT_POST: `/support-post`,
  GET_SUPPORT_POSTS: `/support-post`,
  GET_SUPPORT_POST_BY_ID: (id) => `/support-post/${id}`,
  GET_SUPPORT_POSTS_BY_USER: (userId) => `/support-post/user/${userId}`,
  UPDATE_SUPPORT_POST: (id) => `/support-post/${id}`,
  DELETE_SUPPORT_POST: (id) => `/support-post/${id}`,

  // ========================
  // Mood Log
  // ========================
  CREATE_MOOD_LOG: `/mood-log`,
  GET_MOOD_LOGS: `/mood-log`,
  GET_MOOD_STATS: `/mood-log/mood-stats`,
  UPDATE_MOOD_LOG: (id) => `/mood-log/${id}`,
  DELETE_MOOD_LOG: (id) => `/mood-log/${id}`,

  // ========================
  // Groups
  // ========================
  CREATE_GROUP: `/group`,
  GET_GROUPS: `/group`,
  UPDATE_GROUP: (groupId) => `/group/${groupId}`,
  DELETE_GROUP: (groupId) => `/group/${groupId}`,
  JOIN_GROUP: (groupId) => `/group/${groupId}/join`,
  LEAVE_GROUP: (groupId) => `/group/${groupId}/leave`,
  GET_GROUP_MEMBERS: (groupId) => `/group/${groupId}/members`,
};
