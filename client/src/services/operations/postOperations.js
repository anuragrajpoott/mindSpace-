import { toast } from "react-hot-toast";
import { axiosConnector, endPoints } from "../apiConnector";
import { addPost, setDeletedPost, setUpdatedPost, setPosts } from "../../redux/Slices/postSlice";

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

export const createPost = (postData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("POST", endPoints.CREATE_POST, postData),
      "Creating post...",
      "Post created",
      "Post creation failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(addPost(response.data.post));
    navigate("/");
  } catch {}
};

export const updatePost = (postId, updatedData, navigate) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("PUT", `${endPoints.UPDATE_POST}/${postId}`, updatedData),
      "Updating post...",
      "Post updated",
      "Post update failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setUpdatedPost(response.data.post));
    navigate("/");
  } catch {}
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await handleAsyncWithToast(
      () => axiosConnector("DELETE", `${endPoints.DELETE_POST}/${postId}`),
      "Deleting post...",
      "Post deleted",
      "Delete failed"
    );

    if (!response?.data?.success) throw new Error(response.data.message);

    dispatch(setDeletedPost());
  } catch {}
};

export const getAllPosts = () => async (dispatch) => {
  const toastId = toast.loading("Loading posts...");
  try {
    const response = await axiosConnector("GET", endPoints.GET_POSTS);
    if (!response?.data?.success) throw new Error(response.data.message);

    console.log(response.data.posts)

    dispatch(setPosts(response.data.posts));

  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    toast.error("Failed to load posts");
  } finally {
    toast.dismiss(toastId);
  }
};
