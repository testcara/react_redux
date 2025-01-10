/*
这段代码用来处理用户登录的状态管理。
*/
import {
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AuthActionTypes,
} from "../actions/authActions";
import { logToLocalStorage } from "../../utils/logUtil";
// 认证相关的数据结构
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null, // 当前登录的用户
  error: null, // 登录失败时的错误信息
};

// authReducer函数是一个标准的redux reducer。它负责根据不同的action类型来更新
// redux store中的状态
const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state, // 对象扩展运算符，它确保保留之前的状态，只修改user和error
        user: null,
        error: null,
      };
    case LOGIN_SUCCESS:
      logToLocalStorage(`LOGIN_SUCCESS triggered with username: ${action.payload.username}`);
      logToLocalStorage("begin to patch status after login")
      return {
        ...state, // 对象扩展运算符，它确保保留之前的状态，只修改user和error
        user: action.payload.username,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case LOGOUT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
    default:
      return state; // 用于处理未定义的action类型
  }
};

export default authReducer;
