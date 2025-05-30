import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { addResource, setDeleteResource, setUpdatedResource, setResources } from "../../redux/Slices/resourceSlice";

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

export const createResource = (resourceData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_RESOURCE, resourceData),
      "Creating resource...",
      "Resource created",
      "Resource creation failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addResource(response.data.resource));
    navigate("/resources");
  } catch {}
};

export const updateResource = (resourceId, updatedData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_RESOURCE}/${resourceId}`, updatedData),
      "Updating resource...",
      "Resource updated",
      "Resource update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedResource(response.data.resource));
    navigate("/resources");
  } catch {}
};

export const getAllResources = () => async () => {
  const toastId = toast.loading("Loading resources...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_RESOURCES);
    if (!response?.data?.success) throw new Error(response.data.message);

    setResources(response.data.resources);
  } catch (error) {
    console.error("GET RESOURCES ERROR:", error);
    toast.error("Failed to load resources");
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteResource = (resourceId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", `${endPoints.DELETE_RESOURCE}/${resourceId}`),
      "Deleting resource...",
      "Resource deleted",
      "Delete failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeleteResource());
  } catch {}
};
