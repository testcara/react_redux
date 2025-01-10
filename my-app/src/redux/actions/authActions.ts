/*
这段代码实现了一个基本的redux action和action creator, 用于处理用户
登录的成功与失败。
*/
// 定义action type属性值
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// 定义action
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS; // typeof 关键字实现类型推断
  payload: { username: string }; // 该action携带的数据，表示登录成功的用户名
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string; // 表示失败的原因或错误消息
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: { username: string };
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

interface LogOutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  payload: null;
}

interface LogOutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}

// 合并action类型。 AuthActionTypes表示成功登录或失败登录的action
export type AuthActionTypes =
  | LogOutFailureAction
  | LogOutSuccessAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterFailureAction
  | RegisterSuccessAction;

// action创建函数，创建定义的action对象

// loginSuccess action creator 接收一个username的参数，然后返回LoginSucessAction
export const loginSuccess = (username: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { username },
});

// loginFailure action creator 接收一个errormessage，然后返回LoginFailureAction
export const loginFailure = (errorMessage: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});

export const registerSuccess = (username: string): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: { username },
});

export const registerFailure = (errorMessage: string): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  payload: errorMessage,
});

export const logoutSuccess= (): AuthActionTypes => ({
  type: LOGOUT_SUCCESS,
  payload: null,
})

export const logoutFailure= (errorMessage: string): AuthActionTypes => ({
  type: LOGOUT_FAILURE,
  payload: errorMessage,
})