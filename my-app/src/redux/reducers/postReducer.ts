import {
  CREATE_FAILURE,
  CREATE_SUCCESS,
  DELETE_FAILURE,
  DELETE_SUCCESS,
  FETCHPOSTS_FAILURE,
  FETCHPOSTS_SUCCESS,
  EDITPOST_FAILURE,
  EDITPOST_SUCCESS,
  PostActionTypes,
} from "../actions/postActions";
import { logToLocalStorage } from "../../utils/logUtil";
import { Post } from "../../types/PostType";

interface PostState {
  posts: Post[] | [];
  title: string | null;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  title: null,
  error: null,
};

const postReducer = (
  state = initialState,
  action: PostActionTypes
): PostState => {
  switch (action.type) {
    case CREATE_SUCCESS:
      logToLocalStorage("createPost", "dispatching for success");
      return {
        ...state,
        title: action.payload.title,
        error: null,
      };
    case CREATE_FAILURE:
      logToLocalStorage("createPost", "dispatching for failure");
      return {
        ...state,
        error: action.payload,
        title: null,
      };
    case FETCHPOSTS_SUCCESS:
      logToLocalStorage("fetchPosts", "dispatching for success");
      return {
        ...state,
        posts: action.payload.posts,
        error: null,
      };
    case FETCHPOSTS_FAILURE:
      logToLocalStorage("fetchPosts", "dispatching for failure");
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case EDITPOST_SUCCESS:
      logToLocalStorage("editPost", "dispatching for success");
      return {
        ...state,
        title: action.payload.title,
        error: null,
      };
    case EDITPOST_FAILURE:
      logToLocalStorage("editPost", "dispatching for failure");
      return {
        ...state,
        title: null,
        error: action.payload,
      };
    case DELETE_FAILURE:
      logToLocalStorage("deletePost", "dispatching for failure");
      return {
        ...state,
        title: null,
        error: action.payload,
      };
    case DELETE_SUCCESS:
      logToLocalStorage("deletePost", "dispatching for success");
      return {
        ...state,
        error: null,
        title: null,
      };
    default:
      return state;
  }
};

export default postReducer;
