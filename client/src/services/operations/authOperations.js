import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setUser } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = endPoints;

/**
 * Registers a new user and navigates to feed.
 * @param {Object} formData - Signup form data
 * @param {Function} navigate - React router navigation function
 */
export const register = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", SIGNUP_API, formData, {}, {}, true);
    const { success, message, newUser } = res.data;

    if (!success) throw new Error(message);

    toast.success("Registration successful");
    dispatch(setUser(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/feed");
  } catch (error) {
    console.error("Registration error:", error);
    toast.error(error?.response?.data?.message || error.message || "Registration failed");
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs in user and navigates to feed.
 * @param {Object} formData - Login form data
 * @param {Function} navigate - React router navigation function
 */
export const login = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", LOGIN_API, formData, {}, {}, true);
    const { success, message, existingUser } = res.data;

    if (!success) throw new Error(message);

    toast.success("Login successful");
    dispatch(setUser(existingUser));
    localStorage.setItem("user", JSON.stringify(existingUser));
    navigate("/feed");
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error?.response?.data?.message || error.message || "Login failed");
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs out the user from frontend and backend.
 * @param {Function} [navigate] - Optional: navigate to login page
 */
export const logout = (navigate) => async (dispatch) => {
  try {
    await axiosConnector("POST", LOGOUT_API, {}, {}, {}, true);
  } catch (err) {
    console.warn("Logout error:", err.message);
  }

  dispatch(setUser(null));
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
  if (navigate) navigate("/login");
};
