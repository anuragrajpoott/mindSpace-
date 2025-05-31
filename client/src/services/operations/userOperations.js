import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { setUser, setToken, clearUser, setProfile, setLoading, setSearchResults, clearSearchResults } from "../../redux/Slices/userSlice";

export function signUp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));
    try {
      const response = await axiosConnector("POST", endPoints.REGISTER, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
    try {
      const response = await axiosConnector("POST", endPoints.LOGIN, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/log-in");
  };
}

export function updateProfile(token,userId, profileData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");
    dispatch(setLoading(true));
    try {
      const response = await axiosConnector("PUT", `${endPoints.UPDATE_PROFILE}/${userId}`, profileData, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProfile(response.data.updatedUser));
      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Update profile failed:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export const searchUsers = (token,query) => async (dispatch) => {
  const toastId = toast.loading("Searching...");
  dispatch(setLoading(true));
  dispatch(clearSearchResults());

  try {
    const response = await axiosConnector("GET", `${endPoints.SEARCH_USER}?q=${encodeURIComponent(query)}`, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Search failed");
    }

    dispatch(setSearchResults(response.data.results));
    toast.success("Search completed");
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message || "Search error");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};