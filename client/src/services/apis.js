const BASE_URL = "http://localhost:4000/api/v1";

export const endPoints = {
  // Auth
  SIGNUP_API: BASE_URL + "/auth/sign-up",
  LOGIN_API: BASE_URL + "/auth/log-in",
  
  // User Profile
  UPDATE_PROFILE_API: BASE_URL + "/users/update-profile",

  // Posts
  CREATE_POST_API: BASE_URL + "/posts",
  GET_POSTS_API: BASE_URL + "/posts",

  // Likes
  LIKE_POST_API: BASE_URL + "/posts/like",

  // Comments
  COMMENT_POST_API: BASE_URL + "/comments",
  GET_COMMENTS_API: BASE_URL + "/comments",

  // Friends
  ADD_FRIEND_API: BASE_URL + "/friends/add",
  GET_FRIENDS_API: BASE_URL + "/friends",

  // Messages
  SEND_MESSAGE_API: BASE_URL + "/messages/send",
  GET_MESSAGES_API: BASE_URL + "/messages",

  // Notifications
  GET_NOTIFICATIONS_API: BASE_URL + "/notifications",
  MARK_NOTIFICATION_READ_API: BASE_URL + "/notifications/read",
};
