import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { addGroup, setDeletedGroup, setUpdatedGroup, setGroups } from "../../redux/Slices/groupSlice";

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

export const createGroup = (groupData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_GROUP, groupData),
      "Creating group...",
      "Group created",
      "Group creation failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addGroup(response.data.data));
    navigate("/groups");
  } catch {}
};

export const getAllGroups = () => async (dispatch) => {
  const toastId = toast.loading("Loading groups...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_GROUPS);
    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setGroups(response.data.data))
  } catch (error) {
    console.error("GET GROUPS ERROR:", error);
    toast.error("Failed to fetch groups");
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateGroup = (groupId, updatedData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_GROUP}/${groupId}`, updatedData),
      "Updating group...",
      "Group updated",
      "Group update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedGroup(response.data.data));
    navigate("/groups");
  } catch {}
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", `${endPoints.DELETE_GROUP}/${groupId}`),
      "Deleting group...",
      "Group deleted",
      "Delete failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeletedGroup());
  } catch {}
};
