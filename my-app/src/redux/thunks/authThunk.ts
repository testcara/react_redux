import { Dispatch } from "redux";
import { loginSuccess, loginFailure } from "../actions/authActions";

// 使用 Redux Thunk 进行异步登录请求
export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log("Login attempt for:", username); // 调试日志
      // 模拟登录请求
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // 如果登录成功，分发 LOGIN_SUCCESS
      dispatch(loginSuccess(username));
      console.log("Login successful for:", username); // 调试日志
    } catch (error:any) {
      // 如果登录失败，分发 LOGIN_FAILURE
      dispatch(loginFailure(error.message));
      console.log("Login failed:", error.message); // 调试日志
    }
  };
};
