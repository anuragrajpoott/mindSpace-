import { axiosConnector } from "../axios";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../../redux/slice";

const { UPDATE_PROFILE_API, GET_USER_API, SEARCH_USERS_API } = endPoints;

export const getUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${GET_USER_API}/${userId}`);
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
    const res = await axiosConnector("PUT", UPDATE_PROFILE_API, formData);
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

export const searchUsers = (query) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", SEARCH_USERS_API, null, null, { q: query });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.users; // Return users list to the caller
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "User search failed");
  } finally {
    dispatch(setLoading(false));
  }
};
