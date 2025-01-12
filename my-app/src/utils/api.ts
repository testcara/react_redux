import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { logToLocalStorage } from "./logUtil";
// 创建一个 axios 实例

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 设置基础URL
  headers: {
    "Content-Type": "application/json", // 默认请求头
  },
  timeout: 5000, // 请求超时时间，单位毫秒
});

// 可以添加请求拦截器和响应拦截器
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      logToLocalStorage("api", `Request made with token: ${token}`);
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }
    logToLocalStorage("api", `Request made`);
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    logToLocalStorage("api", `got response: ${response}`);
    return response;
  },
  (error) => {
    logToLocalStorage("api", `Response error ${error}`);
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
