import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import {
  addGroup,
  setDeletedGroup,
  setUpdatedGroup,
  setGroups,
  setLoading,
  setError,
  clearError,
  setGroupMessages,
} from "../../redux/Slices/groupSlice";

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

export const createGroup = (newGroup, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_GROUP, newGroup),
      "Creating group...",
      "Group created",
      "Group creation failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addGroup(response.data.data));
    navigate("/groups");
  } catch {}
};

export const getAllGroups = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  const toastId = toast.loading("Loading groups...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_GROUPS,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setGroups(response.data.data));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch groups"));
    toast.error("Failed to fetch groups");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

export const updateGroup = (token,groupId, updatedData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_GROUP}/${groupId}`, updatedData,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Updating group...",
      "Group updated",
      "Group update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedGroup(response.data.data));
    navigate("/groups");
  } catch {}
};

export const deleteGroup = (token,groupId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", `${endPoints.DELETE_GROUP}/${groupId}`,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Deleting group...",
      "Group deleted",
      "Delete failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);


    dispatch(setDeletedGroup(groupId));
  } catch {}
};

export const sendGroupMessages = (newMsg,groupId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.SEND_GROUP_MESSAGE(groupId), newMsg),
      "Sending Message...",
      "Message Sent",
      "Failed Sending Message"
    );

    if (!response?.data?.success) throw new Error(response.data.message);



    dispatch(setGroupMessages(response.data.data));
  } catch {}
};


