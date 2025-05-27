// src/operations/moodOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setMoodLogs, addMoodLog } from "../../redux/Slices/moodSlice";
import toast from "react-hot-toast";

const { CREATE_MOOD_LOG, GET_MOOD_LOGS } = endPoints;

/**
 * Logs a new mood entry
 * @param {Object} moodData - Mood form data (e.g. emotion, notes, date)
 */
export const logMood = (moodData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_MOOD_LOG, moodData);
    const { success, moodLog } = res.data;

    if (!success) throw new Error("Failed to log mood");

    dispatch(addMoodLog(moodLog));
    toast.success("Mood logged successfully");
  } catch (error) {
    console.error("Log Mood Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Mood logging failed");
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Fetch all mood logs (for dashboard/history)
 */
export const fetchMoodLogs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", GET_MOOD_LOGS);
    const { success, logs } = res.data;

    if (!success) throw new Error("Failed to fetch mood logs");

    dispatch(setMoodLogs(logs));
  } catch (error) {
    console.error("Fetch Mood Logs Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Failed to fetch mood history");
  } finally {
    dispatch(setLoading(false));
  }
};
