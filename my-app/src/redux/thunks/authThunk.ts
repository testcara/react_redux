import { Dispatch } from "redux";
import {
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
  logoutSuccess,
  logoutFailure,
  fetchmeSuccess,
} from "../actions/authActions";
import apiClient from "../../utils/api";
import { logToLocalStorage } from "../../utils/logUtil";

// 使用redux thunk进行token验证并获取username
export const fetchMe = () => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("fetchme", "Attempt for fetching me...");
      const response = await apiClient.get("/users/me");
      const username = response.data.username;
      logToLocalStorage("fetchme", `Have fetched me: ${username}`);
      dispatch(fetchmeSuccess(username));
      logToLocalStorage(
        "fetchme",
        `Dispatch successfully after fetch me for ${username}`
      ); // 调试日志
    } catch (error: any) {
      logToLocalStorage(
        "fetchme",
        `Fetching me failed: ${error.response.data}`
      );
    }
  };
};

// 使用 Redux Thunk 进行异步登录请求
export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      logToLocalStorage("login", `Login attempt for: ${username}`); // 调试日志
      // 发起登录请求
      const response = await apiClient.post("/login", { username, password });
      logToLocalStorage("login", `got response ${response}`);
      // 提取token并保存到localStorage
      const { token } = response.data; // 从返回的响应中获取token
      if (token) {
        localStorage.setItem("token", token); // 将token保存到localStorage
        logToLocalStorage("login", `Token saved for ${username}`); // 调试日志
      }

      // 分发登录成功的action
      dispatch(loginSuccess(username));
      logToLocalStorage("login", `Login successful for ${username}`); // 调试日志
    } catch (error: any) {
      console.log("Error:", error);
      // 输出完整错误对象查看详细信息
      if (error.response && error.response.data) {
        logToLocalStorage(
          "login",
          `Login failed: ${error.response.data.msg || error.response.data}`
        ); // 打印服务器返回的错误信息
        dispatch(loginFailure(error.response.data.msg || error.response.data));
      } else {
        logToLocalStorage("login", `Login failed: ${error.message}`);
        dispatch(loginFailure(error.message));
      }
    }
  };
};

// 使用 Redux Thunk 进行异步登录请求
export const registerUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("Register attempt for:", username); // 调试日志
      // 模拟登录请求
      await apiClient.post("/register", { username, password });
      dispatch(registerSuccess(username));
      console.log("Register successful for:", username); // 调试日志
    } catch (error: any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(registerFailure(error.response.data));
      console.log("Register failed:", error.response.data); // 调试日志
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("logout..."); // 调试日志
      // 模拟登录请求
      dispatch(logoutSuccess());
      localStorage.removeItem("token");
      console.log("logout successful!"); // 调试日志
    } catch (error: any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(logoutFailure(error.response.data));
      console.log("Logout failed:", error.response.data); // 调试日志
    }
  };
};
