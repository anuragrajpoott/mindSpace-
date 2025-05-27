import axios from "axios";

export const axiosInstance = axios.create({
  // you can add baseURL or default headers here if needed
  // baseURL: "http://localhost:4000/api/v1"
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
