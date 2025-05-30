import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { addMoodLog, setDeletedMoodLog, setUpdatedMoodLog } from "../../redux/Slices/moodLogSlice";

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

export const createMoodLog = (formData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_MOODLOG, formData),
      "Logging mood...",
      "Mood logged successfully",
      "Failed to log mood"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addMoodLog(response.data.data));
    navigate("/mood-log");
  } catch {}
};

export const getMoodLog = (setMoodData) => async () => {
  const toastId = toast.loading("Fetching mood data...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_MOOD_LOG);
    if (!response?.data?.success) throw new Error(response.data.message);

    setMoodData(response.data.data);
  } catch (error) {
    console.error("GET MOOD LOG ERROR:", error);
    toast.error("Failed to fetch mood log");
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateMoodLog = (updatedMoodData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", endPoints.UPDATE_MOOD_LOG, updatedMoodData),
      "Updating mood...",
      "Mood updated",
      "Mood update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedMoodLog(response.data.data));
    navigate("/mood-log");
  } catch {}
};

export const deleteMoodLog = () => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", endPoints.DELETE_MOOD_LOG),
      "Deleting mood log...",
      "Mood log deleted",
      "Failed to delete mood log"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeletedMoodLog());
  } catch {}
};
