import { axiosConnector } from "../../services/axios";
import {
  setLoading,
  setResources,
  addResource,
  updateSupportResource,
  deleteSupportResource,
  setError,
} from "../../redux/Slices/supportResourceSlice";
import toast from "react-hot-toast";

const baseUrl = "/support-resource";
import { endPoints } from "../apis";



// Create a support resource (POST /)
export const createResource = (resourceData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("POST", endPoints.CREATE_SUPPORT_RESOURCE, resourceData);
    dispatch(addResource(res.data.resource));
    toast.success("Resource created");
  } catch (error) {
    toast.error("Creation failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get all resources (GET /)
export const fetchResources = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", endPoints.GET_SUPPORT_RESOURCES);
    dispatch(setResources(res.data.resources));
  } catch (error) {
    toast.error("Failed to fetch resources");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get a resource by ID (GET /:id)
export const fetchResourceById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${endPoints.GET_SUPPORT_RESOURCE_BY_ID}/${id}`);
    dispatch(addResource(res.data.resource)); // optional usage
  } catch (error) {
    toast.error("Failed to fetch resource");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get resources by category (GET /category/:category)
export const fetchResourcesByCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${endPoints.GET_SUPPORT_RESOURCES_BY_CATEGORY}/category/${category}`);
    dispatch(setResources(res.data.resources));
  } catch (error) {
    toast.error("Failed to fetch by category");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Search resources (GET /search/:keyword)
export const searchResources = (keyword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("GET", `${endPoints.SEARCH_SUPPORT_RESOURCES}/search/${keyword}`);
    dispatch(setResources(res.data.resources));
  } catch (error) {
    toast.error("Search failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update a resource (PUT /:id)
export const updateResource = (id, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosConnector("PUT", `${endPoints.UPDATE_SUPPORT_RESOURCE}/${id}`, updatedData);
    dispatch(updateResource(res.data.updatedResource));
    toast.success("Resource updated");
  } catch (error) {
    toast.error("Update failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a resource (DELETE /:id)
export const deleteResource = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosConnector("DELETE", `${endPoints.DELETE_SUPPORT_RESOURCE}/${id}`);
    dispatch(deleteResource(id));
    toast.success("Resource deleted");
  } catch (error) {
    toast.error("Delete failed");
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
