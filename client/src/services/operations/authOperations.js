import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setToken } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";
import { setUser } from "../../redux/Slices/userSlice";

const { SIGNUP, LOGIN } = endPoints;


export const register = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", SIGNUP, formData, {}, {}, true);
    const { success, message, newUser } = res.data;

    if (!success) throw new Error(message);

    toast.success("Registration successful");
    dispatch(setToken(newUser.token));
    localStorage.setItem("token", JSON.stringify(newUser.token));
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


export const login = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", LOGIN, formData, {}, {}, true);
    const { success, message, existingUser } = res.data;

    if (!success) throw new Error(message);

    toast.success("Login successful");
    dispatch(setUser(existingUser));
    localStorage.setItem("user", JSON.stringify(existingUser));
    dispatch(setToken(existingUser.token));
    localStorage.setItem("token", JSON.stringify(existingUser.token));
    navigate("/feed");
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error?.response?.data?.message || error.message || "Login failed");
  } finally {
    dispatch(setLoading(false));
  }
};


export const logout = (navigate) => async (dispatch) => {
  dispatch(setUser(null));
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
  if (navigate) navigate("/login");
};
