import { Post } from "../../types/PostType";

// 定义type属性值
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAILURE = "CREATE_FAILURE";
export const FETCHPOSTS_SUCCESS = "FETCHPOSTS_SUCCESS";
export const FETCHPOSTS_FAILURE = "FETCHPOSTS_FAILURE";
export const EDITPOST_SUCCESS = "EDITPOST_SUCESS";
export const EDITPOST_FAILURE = "EDITPOST_FAILURE";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILURE = "DELETE_FAILURE";

// 定义types
export type PostActionTypes =
  | CreateFailureAction
  | CreateSuccessAction
  | FetchPostsFailureAction
  | FetchPostsSuccessAction
  | EditPostFailureAction
  | EditPostSuccessAction
  | DeletePostFailureAction
  | DeletePostSuccessAction;

// 定义action
interface DeletePostFailureAction {
    type: typeof DELETE_FAILURE;
    payload: string;
}

interface DeletePostSuccessAction {
    type: typeof DELETE_SUCCESS;
    payload: null;
}
interface EditPostSuccessAction {
  type: typeof EDITPOST_SUCCESS;
  payload: { title: string };
}

interface EditPostFailureAction {
  type: typeof EDITPOST_FAILURE;
  payload: string;
}

interface FetchPostsSuccessAction {
  type: typeof FETCHPOSTS_SUCCESS;
  payload: { posts: Post[] };
}

interface FetchPostsFailureAction {
  type: typeof FETCHPOSTS_FAILURE;
  payload: string;
}

interface CreateSuccessAction {
  type: typeof CREATE_SUCCESS;
  payload: { title: string };
}

interface CreateFailureAction {
  type: typeof CREATE_FAILURE;
  payload: string;
}

// action创建函数
export const createSuccess = (title: string): PostActionTypes => ({
  type: CREATE_SUCCESS,
  payload: { title },
});

export const createFailure = (errorMessage: string): PostActionTypes => ({
  type: CREATE_FAILURE,
  payload: errorMessage,
});

export const fetchSuccess = (posts: Post[]): PostActionTypes => ({
  type: FETCHPOSTS_SUCCESS,
  payload: { posts },
});

export const fetchFailure = (errorMessage: string): PostActionTypes => ({
  type: FETCHPOSTS_FAILURE,
  payload: errorMessage,
});

export const editSuccess = (title: string): PostActionTypes => ({
  type: EDITPOST_SUCCESS,
  payload: { title },
});

export const editFailure = (errorMessage: string): PostActionTypes => ({
  type: EDITPOST_FAILURE,
  payload: errorMessage,
});

export const deleteFailure = (errorMessage: string): PostActionTypes => ({
    type: DELETE_FAILURE,
    payload: errorMessage
})

export const deleteSuccess = (): PostActionTypes => ({
    type: DELETE_SUCCESS,
    payload: null
})