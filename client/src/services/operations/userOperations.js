import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../redux/Slices/authSlice";

const { GET_ALL_USER, GET_USER_PROFILE, UPDATE_PROFILE, DELETE_USER } = endPoints;

export const fetchProfile = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${GET_USER_PROFILE}/${userId}`);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.user; // Return user data to the caller
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch user");
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", UPDATE_PROFILE, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("Profile updated");
    dispatch(setUser(res.data.updatedUser));
    localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Profile update failed");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getAllUser = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", GET_ALL_USER, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("All users Fetched");
    dispatch(setUser(res.data.updatedUser));
    localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Error while Getting Users");
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteUser = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", DELETE_USER, formData);
    if (!res.data.success) throw new Error(res.data.message);
    toast.success("user Deleted");
    dispatch(setUser(null));
    localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "User Deletion Failed");
  } finally {
    dispatch(setLoading(false));
  }
};


