const BASE_URL = "http://localhost:4000/api/v1/auth";

export const endPoints = {
  LOGIN: `${BASE_URL}/log-in`,
  SIGNUP: `${BASE_URL}/sign-up`,
  SEND_OTP: `${BASE_URL}/send-otp`,  // add this if you plan to use it
};
