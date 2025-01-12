import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { logToLocalStorage } from "../utils/logUtil";
import { CreatePostRequest, UpdatePostRequest } from "../types/PostType";
import {
  createPost,
  deletePost,
  editPost,
  fetchPosts,
} from "../redux/thunks/postThunk";

const usePost = () => {
  const dispatch = useDispatch();
  const { posts, title, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    fetch();
  }, [posts]);

  const create = (post: CreatePostRequest) => {
    try {
      dispatch(createPost(post));
      logToLocalStorage("createPost", `hook for create success: ${title}`);
    } catch (error: any) {
      logToLocalStorage(
        "createPost",
        `hook for create failed: ${error.response.data || error.message}`
      );
    }
  };

  const fetch = () => {
    try {
      dispatch(fetchPosts());
      logToLocalStorage("fetchPosts", "hook for fetch success");
    } catch (error: any) {
      logToLocalStorage(
        "fetchPosts",
        `hook for fetch failure: ${error.response.data || error.message}`
      );
    }
  };

  const edit = (id: number, post: UpdatePostRequest) => {
    try {
      dispatch(editPost(id, post));
      logToLocalStorage("editPost", "hook for edit success");
    } catch (error: any) {
      logToLocalStorage(
        "editPost",
        `hook for edit failure: ${error.response.data || error.message}`
      );
    }
  };

  const drop = (id: number) => {
    try {
      dispatch(deletePost(id));
      logToLocalStorage("deletePost", "hook for delete success");
    } catch (error: any) {
      logToLocalStorage(
        "deletePost",
        `hook for delete failure: ${error.response.data || error.message}`
      );
    }
  };
  return { error, create, posts, edit, drop };
};
export default usePost;
