import { Dispatch } from "redux";
import { loginSuccess, loginFailure, registerFailure, registerSuccess, logoutSuccess, logoutFailure } from "../actions/authActions";
import apiClient from "../../utils/api";
import { logToLocalStorage } from "../../utils/logUtil";

// 使用 Redux Thunk 进行异步登录请求
export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage(`Login attempt for: ${username}`); // 调试日志
      // 发起登录请求
      const response = await apiClient.post('/login', { username, password });
      logToLocalStorage(`got response ${response}`)
      // 提取token并保存到localStorage
      const { token } = response.data; // 从返回的响应中获取token
      if (token) {
        localStorage.setItem("authToken", token); // 将token保存到localStorage
        logToLocalStorage(`Token saved for ${username}`); // 调试日志
      }

      // 分发登录成功的action
      dispatch(loginSuccess(username));
      logToLocalStorage(`Login successful for ${username}`); // 调试日志
    } catch (error: any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(loginFailure(error.response?.data || error.message));
      logToLocalStorage(`Login failed: ${error.message}`); // 调试日志
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
  }
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("logout..."); // 调试日志
      // 模拟登录请求
      dispatch(logoutSuccess());
      console.log("logout successful!"); // 调试日志
    } catch (error:any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(logoutFailure(error.response.data));
      console.log("Logout failed:", error.response.data); // 调试日志
    }
  }
};