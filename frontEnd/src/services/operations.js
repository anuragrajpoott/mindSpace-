import { axiosConnector } from "./axios";
import { endPoints } from "./apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../redux/slice";

const { SIGNUP_API, LOGIN_API } = endPoints;

export function signUp(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", SIGNUP_API, formData);

      if (!res.data.success) {
        console.error(res.data.message);
        throw new Error(res.data.message || "Signup failed");
      }

      toast.success("Signup Successful");
      dispatch(setUser(res.data.newUser));
      localStorage.setItem("user", JSON.stringify(res.data.newUser));
      navigate("/feed");

    } catch (error) {
      console.error("SIGNUP API ERROR...", error);
      toast.error(error.message || "Sign Up Failed");
      // Optional: you can choose whether to navigate on failure or not
    }
    dispatch(setLoading(false));
  };
}

export function logIn(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosConnector("POST", LOGIN_API, formData);

      if (!res.data.success) {
        console.error(res.data.message);
        throw new Error(res.data.message || "Login failed");
      }

      toast.success("Log In Successful");
      dispatch(setUser(res.data.existingUser));
      localStorage.setItem("user", JSON.stringify(res.data.existingUser));
      navigate("/feed");

    } catch (error) {
      console.error("LOGIN API ERROR...", error);
      toast.error(error.message || "Log In Failed");
    }
    dispatch(setLoading(false));
  };
}
