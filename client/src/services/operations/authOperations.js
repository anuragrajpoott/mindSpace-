import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../redux/slice";

const { SIGNUP_API, LOGIN_API } = endPoints;

export const register = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", SIGNUP_API, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Registration successful");
    dispatch(setUser(res.data.newUser));
    localStorage.setItem("user", JSON.stringify(res.data.newUser));
    navigate("/feed");
  } catch (error) {
    toast.error(error.message || "Registration failed");
  }
  dispatch(setLoading(false));
};

export const login = (formData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", LOGIN_API, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Login successful");
    dispatch(setUser(res.data.existingUser));
    localStorage.setItem("user", JSON.stringify(res.data.existingUser));
    navigate("/feed");
  } catch (error) {
    toast.error(error.message || "Login failed");
  }
  dispatch(setLoading(false));
};

export const logout = () => (dispatch) => {
  dispatch(setUser(null));
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
};
