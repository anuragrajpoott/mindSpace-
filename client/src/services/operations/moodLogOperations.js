import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setMoodLogs,
  addMoodLog,
  updateMoodLogState,
  deleteMoodLogState,
  setMoodStats,
  setError,
} from "../../redux/Slices/moodLogSlice";
import toast from "react-hot-toast";

const baseUrl = "/moods";

// Create mood log (POST /)
export const createMoodLog = (moodData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", baseUrl, moodData);
    dispatch(addMoodLog(res.data.mood));
    toast.success("Mood log created");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to log mood");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get all mood logs (GET /)
export const fetchMoodLogs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", baseUrl);
    dispatch(setMoodLogs(res.data.moods));
  } catch (error) {
    toast.error("Failed to fetch mood logs");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get mood stats (GET /mood-stats)
export const fetchMoodStats = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${baseUrl}/mood-stats`);
    dispatch(setMoodStats(res.data.stats));
  } catch (error) {
    toast.error("Failed to fetch mood stats");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update mood log (PUT /:id)
export const updateMoodLog = (id, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${baseUrl}/${id}`, updatedData);
    dispatch(updateMoodLogState(res.data.updatedMood));
    toast.success("Mood log updated");
  } catch (error) {
    toast.error("Update failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete mood log (DELETE /:id)
export const deleteMoodLog = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${baseUrl}/${id}`);
    dispatch(deleteMoodLogState(id));
    toast.success("Mood log deleted");
  } catch (error) {
    toast.error("Delete failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
