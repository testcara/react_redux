/*
这段代码实现了一个基本的redux action和action creator, 用于处理用户
登录的成功与失败。
*/
// 定义action type属性值
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// 定义action
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS; // typeof 关键字实现类型推断
  payload: { username: string }; // 该action携带的数据，表示登录成功的用户名
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string; // 表示失败的原因或错误消息
}

// 合并action类型。 AuthActionTypes表示成功登录或失败登录的action
export type AuthActionTypes = LoginSuccessAction | LoginFailureAction;

// action创建函数，创建定义的action对象
export const loginSuccess = (username: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { username },
});

export const loginFailure = (errorMessage: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});
