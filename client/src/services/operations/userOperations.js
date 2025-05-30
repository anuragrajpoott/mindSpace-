import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { setUser, setToken, clearUser, setProfile } from "../../redux/Slices/userSlice";

async function handleAsyncWithToast(asyncFn, loadingMsg, successMsg, errorMsg) {
  const toastId = toast.loading(loadingMsg);
  try {
    const result = await asyncFn();
    toast.success(successMsg);
    return result;
  } catch (error) {
    console.error(errorMsg, error);
    toast.error(error?.response?.data?.message || errorMsg);
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
}

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.REGISTER, formData),
      "Signing up...",
      "Signup successful",
      "Signup failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUser(response.data.newUser));
    dispatch(setToken(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.newUser));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    navigate("/");
  } catch {}
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.LOGIN, formData),
      "Logging in...",
      "Login successful",
      "Login failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    navigate("/");
  } catch {}
};

export const logout = (navigate) => (dispatch) => {
  dispatch(clearUser());
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success("Logged out");
  navigate("/log-in");
};

export const updateProfile = (userId, profileData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_PROFILE}/${userId}`, profileData),
      "Updating profile...",
      "Profile updated",
      "Update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setProfile(response.data.updatedUser));
    localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
    navigate("/profile");
  } catch {}
};
