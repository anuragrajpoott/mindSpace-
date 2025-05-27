import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../redux/slice";

const {
  SIGNUP_API,
  LOGIN_API,
  UPDATE_PROFILE_API,
  CREATE_POST_API,
  GET_POSTS_API,
  LIKE_POST_API,
  COMMENT_POST_API,
  GET_COMMENTS_API,
  ADD_FRIEND_API,
  GET_FRIENDS_API,
  SEND_MESSAGE_API,
  GET_MESSAGES_API,
  GET_NOTIFICATIONS_API,
  MARK_NOTIFICATION_READ_API,
} = endPoints;

// User operations
export function signUp(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", SIGNUP_API, formData);
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Signup Successful");
      dispatch(setUser(res.data.newUser));
      localStorage.setItem("user", JSON.stringify(res.data.newUser));
      navigate("/feed");
    } catch (error) {
      toast.error(error.message || "Sign Up Failed");
    }
    dispatch(setLoading(false));
  };
}

export function logIn(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", LOGIN_API, formData);
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Log In Successful");
      dispatch(setUser(res.data.existingUser));
      localStorage.setItem("user", JSON.stringify(res.data.existingUser));
      navigate("/feed");
    } catch (error) {
      toast.error(error.message || "Log In Failed");
    }
    dispatch(setLoading(false));
  };
}

export function updateProfile(formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("PUT", UPDATE_PROFILE_API, formData);
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Profile Updated");
      dispatch(setUser(res.data.updatedUser));
      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    }
    dispatch(setLoading(false));
  };
}

// Post operations
export function createPost(formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", CREATE_POST_API, formData);
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Post Created");
      // Optionally dispatch to add post to store
    } catch (error) {
      toast.error(error.message || "Post creation failed");
    }
    dispatch(setLoading(false));
  };
}

export function getPosts() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("GET", GET_POSTS_API);
      if (!res.data.success) throw new Error(res.data.message);
      // Dispatch action to set posts in redux
    } catch (error) {
      toast.error(error.message || "Failed to fetch posts");
    }
    dispatch(setLoading(false));
  };
}

export function likePost(postId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", LIKE_POST_API, { postId });
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Post Liked");
      // Optionally update like count in store
    } catch (error) {
      toast.error(error.message || "Failed to like post");
    }
    dispatch(setLoading(false));
  };
}

// Comment operations
export function addComment(postId, comment) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", COMMENT_POST_API, { postId, comment });
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Comment Added");
      // Optionally update comments in store
    } catch (error) {
      toast.error(error.message || "Failed to add comment");
    }
    dispatch(setLoading(false));
  };
}

export function getComments(postId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("GET", GET_COMMENTS_API, null, null, { postId });
      if (!res.data.success) throw new Error(res.data.message);
      // Dispatch action to set comments
    } catch (error) {
      toast.error(error.message || "Failed to fetch comments");
    }
    dispatch(setLoading(false));
  };
}

// Friends operations
export function addFriend(friendId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", ADD_FRIEND_API, { friendId });
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Friend Added");
      // Update friends list in store
    } catch (error) {
      toast.error(error.message || "Failed to add friend");
    }
    dispatch(setLoading(false));
  };
}

export function getFriends() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("GET", GET_FRIENDS_API);
      if (!res.data.success) throw new Error(res.data.message);
      // Dispatch action to set friends
    } catch (error) {
      toast.error(error.message || "Failed to fetch friends");
    }
    dispatch(setLoading(false));
  };
}

// Messages operations
export function sendMessage(receiverId, message) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", SEND_MESSAGE_API, { receiverId, message });
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Message Sent");
      // Update messages in store
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    }
    dispatch(setLoading(false));
  };
}

export function getMessages(conversationId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("GET", GET_MESSAGES_API, null, null, { conversationId });
      if (!res.data.success) throw new Error(res.data.message);
      // Dispatch action to set messages
    } catch (error) {
      toast.error(error.message || "Failed to fetch messages");
    }
    dispatch(setLoading(false));
  };
}

// Notifications operations
export function getNotifications() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("GET", GET_NOTIFICATIONS_API);
      if (!res.data.success) throw new Error(res.data.message);
      // Dispatch action to set notifications
    } catch (error) {
      toast.error(error.message || "Failed to fetch notifications");
    }
    dispatch(setLoading(false));
  };
}

export function markNotificationRead(notificationId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", MARK_NOTIFICATION_READ_API, { notificationId });
      if (!res.data.success) throw new Error(res.data.message);
      toast.success("Notification marked as read");
      // Update notification in store
    } catch (error) {
      toast.error(error.message || "Failed to update notification");
    }
    dispatch(setLoading(false));
  };
}
