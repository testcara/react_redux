import { Dispatch } from "redux";
import { loginSuccess, loginFailure, registerFailure, registerSuccess } from "../actions/authActions";
import apiClient from "../../utils/api";

// 使用 Redux Thunk 进行异步登录请求
export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("Login attempt for:", username); // 调试日志
      // 模拟登录请求
      await apiClient.post('/login', {username, password} )
      dispatch(loginSuccess(username));
      console.log("Login successful for:", username); // 调试日志
    } catch (error:any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(loginFailure(error.response.data));
      console.log("Login failed:", error.message); // 调试日志
    }
  };
};

// 使用 Redux Thunk 进行异步登录请求
export const registerUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("Register attempt for:", username); // 调试日志
      // 模拟登录请求
      await apiClient.post('/register', {username, password} )
      dispatch(registerSuccess(username));
      console.log("Register successful for:", username); // 调试日志
    } catch (error:any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(registerFailure(error.response.data));
      console.log("Register failed:", error.response.data); // 调试日志
    }
  };
};
