import { Dispatch } from "redux";
import {
  createSuccess,
  createFailure,
  fetchSuccess,
  fetchFailure,
  editFailure,
  editSuccess,
  deleteFailure,
  deleteSuccess,
} from "../actions/postActions";
import apiClient from "../../utils/api";
import { logToLocalStorage } from "../../utils/logUtil";
import {
  CreatePostRequest,
  UpdatePostRequest,
} from "../../types/PostType";

export const createPost = (post: CreatePostRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("createPost", "Attempting to create post..");
      const response = await apiClient.post("posts", post);
      const title = response.data.title;
      logToLocalStorage("createPost", `Have created: ${title}`);
      dispatch(createSuccess(title));
      logToLocalStorage(
        "createPost",
        `Dispatched success after create: ${title}`
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data ||
        error?.response?.data?.message ||
        error?.message;
      logToLocalStorage("createPost", `Created failed: ${errorMessage}`);
      dispatch(createFailure(errorMessage));
      logToLocalStorage(
        "createPost",
        `Dispatch failure after create: ${errorMessage}`
      );
    }
  };
};

export const editPost = (id: number, post: UpdatePostRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("editPost", "Attempting to edit post...");
      const response = await apiClient.put(`/post/${id}`, post);
      const title = response.data.title;
      logToLocalStorage("editPost", `Have edited: ${title}`);
      dispatch(editSuccess(title));
      logToLocalStorage("editPost", `Dispatched succes after edit: ${title}`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data ||
        error?.response?.data?.message ||
        error?.message;
      logToLocalStorage("editPost", `Edit failed: ${errorMessage}`);
      dispatch(editFailure(errorMessage));
      logToLocalStorage(
        "editPost",
        `Dispatch failure after edit: ${errorMessage}`
      );
    }
  };
};

export const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("fetchPosts", "Attempting to fetch post...");
      const response = await apiClient.get("posts");
      const posts = response.data;
      logToLocalStorage("fetchPosts", "have fetched");
      dispatch(fetchSuccess(posts));
      logToLocalStorage("fetchPosts", "Dispatched success after fetch");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data ||
        error?.response?.data?.message ||
        error?.message;
      logToLocalStorage("fetchPosts", `fetch failed: ${errorMessage}`);
      dispatch(fetchFailure(errorMessage));
      logToLocalStorage(
        "fetchPosts",
        `Dispatch failure after fetch: ${errorMessage}`
      );
    }
  };
};
export const deletePost = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("deletePost", "Attempting to delete post");
      await apiClient.delete(`/posts/${id}`);
      logToLocalStorage("deletePost", "Have deleted");
      dispatch(deleteSuccess());
      logToLocalStorage("deletePost", "Dispatched success after delete");
    } catch (error: any) {
        logToLocalStorage("deletePost", "Deleted Failed")
        const errorMessage =
        error?.response?.data ||
        error?.response?.data?.message ||
        error?.message;
        dispatch(deleteFailure(errorMessage));
        logToLocalStorage("deletePost", `Dispatch failure after delete: ${errorMessage}`)
        
    }
  };
};
