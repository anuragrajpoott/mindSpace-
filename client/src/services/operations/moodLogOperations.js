// src/operations/moodOperations.js

import { axiosConnector } from "../../services/axios";
import { endPoints } from "../../services/apis";
import { setLoading, setLogs } from "../../redux/Slices/moodLogSlice";
import toast from "react-hot-toast";

const { MOOD_LOG } = endPoints;


export const logMood = (mood) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", MOOD_LOG, mood);
    const { success, moodLog } = res.data;

    if (!success) throw new Error("Failed to log mood");

    dispatch(setLogs(moodLog));
    toast.success("Mood logged successfully");
  } catch (error) {
    console.error("Log Mood Error:", error);
    toast.error(error?.response?.data?.message || error.message || "Mood logging failed");
  } finally {
    dispatch(setLoading(false));
  }
};


