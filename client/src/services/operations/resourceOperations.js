import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import {
  addResource,
  setDeletedResource,
  setUpdatedResource,
  setResources,
  setLoading,
  setError,
  clearError,
} from "../../redux/Slices/resourceSlice";

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

export const createResource = (token,resourceData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_RESOURCE, resourceData,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Creating resource...",
      "Resource created",
      "Resource creation failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addResource(response.data.resource));
    navigate("/resources");
  } catch {}
};

export const updateResource = (token,resourceId, updatedData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_RESOURCE}/${resourceId}`, updatedData,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Updating resource...",
      "Resource updated",
      "Resource update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedResource(response.data.resource));
    navigate("/resources");
  } catch {}
};

export const getAllResources = (token) => async (dispatch) => {
  const toastId = toast.loading("Loading resources...");
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const response = await axiosConnector("GET", endPoints.GET_RESOURCES,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setResources(response.data.resources));
  } catch (error) {
    dispatch(setError(error.message || "Failed to load resources"));
    toast.error("Failed to load resources");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

export const deleteResource = (token,resourceId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", `${endPoints.DELETE_RESOURCE}/${resourceId}`,{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }),
      "Deleting resource...",
      "Resource deleted",
      "Delete failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeletedResource(resourceId));
  } catch {}
};
