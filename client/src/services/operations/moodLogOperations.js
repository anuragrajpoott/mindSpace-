// src/operations/moodOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setMoodLogs } from "../../redux/Slices/moodSlice";
import toast from "react-hot-toast";

const { CREATE_MOOD_LOG, GET_MOOD_LOGS } = endPoints;


export const logMood = (moodData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", CREATE_MOOD_LOG, moodData);
    const { success, moodLog } = res.data;

    if (!success) throw new Error("Failed to log mood");

    dispatch(setMoodLogs(moodLog));
    toast.success("Mood logged successfully");
  } catch (error) {
    console.error("Log Mood Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Mood logging failed");
  } finally {
    dispatch(setLoading(false));
  }
};


