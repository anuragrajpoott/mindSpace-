// src/api.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mind-space-plus.onrender.com/api/v1",
  withCredentials: true,
});

export const axiosConnector = (method, url, data , headers , params ) => {
  return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
  });
};



export const endPoints = {
  // User
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  UPDATE_PROFILE: (userId) => `/user/updateProfile/${userId}`,

  // Resources
  CREATE_RESOURCE: "/resources",
  UPDATE_RESOURCE: (resourceId) => `/resources/${resourceId}`,
  GET_RESOURCES: "/resources",
  DELETE_RESOURCE: (resourceId) => `/resources/${resourceId}`,

  // Posts
  CREATE_POST: "/posts",
  UPDATE_POST: (postId) => `/posts/${postId}`,
  DELETE_POST: (postId) => `/posts/${postId}`,
  GET_POSTS: "/posts",

  // Groups
  CREATE_GROUP: "/groups",
  GET_GROUPS: "/groups",
  UPDATE_GROUP: (groupId) => `/groups/${groupId}`,
  DELETE_GROUP: (groupId) => `/groups/${groupId}`,
  JOIN_GROUP: (groupId) => `/groups/${groupId}/join`,
  SEND_GROUP_MESSAGE: (groupId) => `/groups/${groupId}/message`,

  // MoodLog
  CREATE_MOODLOG: "/moodlog",
  GET_MOODLOG: "/moodlog",
  UPDATE_MOODLOG: "/moodlog",
  DELETE_MOODLOG: "/",
};

