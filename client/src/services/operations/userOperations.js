import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../redux/Slices/userSlice";

const {
  GET_ALL_USER,
  GET_USER_PROFILE,
  UPDATE_PROFILE,
  DELETE_USER,
} = endPoints;

export const fetchProfile = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_USER_PROFILE(userId));
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Failed to fetch user");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // If formData is FormData, send with multipart headers, else normal JSON
    const headers =
      formData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

    const res = await axiosConnector("PUT", UPDATE_PROFILE, formData, { headers });
    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Profile updated");
    dispatch(setUser(res.data.updatedUser));
    localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
    return res.data.updatedUser;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Profile update failed");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_ALL_USER);
    if (!res.data.success) throw new Error(res.data.message);

    toast.success("All users fetched");
    // Dispatch an action if you want to store all users in redux
    // dispatch(setUsers(res.data.users));  // example if you have setUsers
    return res.data.users;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Error while fetching users");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("DELETE", `${DELETE_USER}/${userId}`);
    if (!res.data.success) throw new Error(res.data.message);

    toast.success("User deleted");
    dispatch(setUser(null));
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "User deletion failed");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
