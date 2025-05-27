const BASE_URL = "http://localhost:4000/api/v1";

export const endPoints = {
  // Auth
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `/auth/login`,

  // User Profile
  GET_USER_PROFILE: (userId) => `${BASE_URL}/users/${userId}`,
  UPDATE_PROFILE: `${BASE_URL}/users/update-profile`,
  DELETE_USER: `${BASE_URL}/users/delete`,

  // Posts
  CREATE_POST: `${BASE_URL}/posts`,
  GET_POSTS: (page = 0, limit = 20) => `${BASE_URL}/posts?page=${page}&limit=${limit}`,
  DELETE_POST: (postId) => `${BASE_URL}/posts/${postId}`,

  // Likes (toggle like/unlike)
  TOGGLE_LIKE: (postId) => `${BASE_URL}/posts/${postId}/like`,

  // Comments
  CREATE_COMMENT: `${BASE_URL}/comments`,
  GET_COMMENTS: (postId) => `${BASE_URL}/comments/post/${postId}`,
  DELETE_COMMENT: (commentId) => `${BASE_URL}/comments/${commentId}`,

  // Friends
  ADD_FRIEND: (friendId) => `${BASE_URL}/friends/add/${friendId}`,
  REMOVE_FRIEND: (friendId) => `${BASE_URL}/friends/remove/${friendId}`,
  GET_FRIENDS: `${BASE_URL}/friends`,

  // Messages
  SEND_MESSAGE: `${BASE_URL}/messages/send`,
  GET_MESSAGES_BETWEEN: (otherUserId) => `${BASE_URL}/messages/${otherUserId}`,
  MARK_MESSAGE_READ: (messageId) => `${BASE_URL}/messages/read/${messageId}`,
  DELETE_MESSAGE: (messageId) => `${BASE_URL}/messages/${messageId}`,

  // Notifications
  GET_NOTIFICATIONS: `${BASE_URL}/notifications`,
  MARK_NOTIFICATION_READ: (notificationId) => `${BASE_URL}/notifications/read/${notificationId}`,
};
