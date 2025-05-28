import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import {
  setLoading,
  setToken,
  setUser,
  setError,
  setMessage,
  logoutUser,
} from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";

const {
  SIGNUP,
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  GET_CURRENT_USER,
} = endPoints;

// Register user
export const register = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", SIGNUP, formData);
    const { newUser } = res.data;
    dispatch(setToken(newUser.token));
    dispatch(setUser(newUser));
    toast.success("Registered successfully!");
    navigate("/feed");
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Login user
export const login = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", LOGIN, formData);
    const { user } = res.data;
    dispatch(setToken(user.token));
    dispatch(setUser(user));
    toast.success("Logged in successfully!");
    navigate("/feed");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout user
export const logout = (navigate) => async (dispatch) => {
  try {
    await axiosConnector("POST", LOGOUT); // call backend logout if exists
  } catch {
    // ignore errors here
  }
  dispatch(logoutUser());
  toast.success("Logged out");
  if (navigate) navigate("/log-in");
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", FORGOT_PASSWORD, { email });
    toast.success("Password reset link sent!");
    dispatch(setMessage(res.data.message));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send reset link");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Reset password
export const resetPassword = (formData, token, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", `${RESET_PASSWORD}/${token}`, formData);
    toast.success("Password reset successful");
    dispatch(setMessage(res.data.message));
    if (navigate) navigate("/log-in");
  } catch (error) {
    toast.error(error.response?.data?.message || "Reset failed");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update password (authenticated)
export const updatePassword = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", UPDATE_PASSWORD, formData);
    toast.success("Password updated");
    dispatch(setMessage(res.data.message));
  } catch (error) {
    toast.error(error.response?.data?.message || "Password update failed");
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get current logged-in user data
export const getCurrentUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_CURRENT_USER);
    dispatch(setUser(res.data.user));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
