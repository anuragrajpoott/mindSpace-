import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import {
  addMoodLog,
  setDeletedMoodLog,
  setUpdatedMoodLog,
  setLoading,
  setError,
  clearError,
  setMoodLogs, // optional if you want to keep mood logs in redux
} from "../../redux/Slices/moodLogSlice";

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

export const createMoodLog = (token,formData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_MOODLOG, formData,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Logging mood...",
      "Mood logged successfully",
      "Failed to log mood"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addMoodLog(response.data.data));
    navigate("/mood-log");
  } catch {}
};

export const getMoodLog = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  const toastId = toast.loading("Fetching mood data...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_MOODLOG, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setMoodLogs(response.data.data));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch mood log"));
    toast.error("Failed to fetch mood log");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

export const updateMoodLog = (token,updatedMoodData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", endPoints.UPDATE_MOODLOG, updatedMoodData, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Updating mood...",
      "Mood updated",
      "Mood update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedMoodLog(response.data.data));
    navigate("/mood-log");
  } catch {}
};

export const deleteMoodLog = (token) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", endPoints.DELETE_MOODLOG,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Deleting mood log...",
      "Mood log deleted",
      "Failed to delete mood log"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeletedMoodLog());
  } catch {}
};
