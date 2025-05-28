import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setError,
  setAllUsers,
  setProfile,
  updateCurrentUserProfile,
  removeAccount,
} from "../../redux/Slices/userSlice";
import toast from "react-hot-toast";

const baseUrl = "/users";

// 🔄 Update own profile (PUT /me/profile)
export const updateOwnProfile = (profileData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${baseUrl}/me/profile`, profileData);
    dispatch(updateCurrentUserProfile(res.data.updatedProfile));
    toast.success("Profile updated");
  } catch (error) {
    toast.error("Profile update failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// ❌ Delete own account (DELETE /me)
export const deleteOwnAccount = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${baseUrl}/me`);
    dispatch(removeAccount());
    toast.success("Account deleted");
  } catch (error) {
    toast.error("Account deletion failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// 👤 Get user profile by ID (GET /:id)
export const getUserProfileById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/${id}`);
    dispatch(setProfile(res.data.user));
  } catch (error) {
    toast.error("Failed to load profile");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// 📋 Get all users (GET /)
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", baseUrl);
    dispatch(setAllUsers(res.data.users));
  } catch (error) {
    toast.error("Failed to fetch users");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
