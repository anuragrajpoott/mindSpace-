// src/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Change this to match your server
  withCredentials: true, // Important for sending/receiving cookies
});

export const axiosConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
