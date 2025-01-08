import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建一个 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 设置基础URL
  headers: {
    'Content-Type': 'application/json', // 默认请求头
  },
  timeout: 5000, // 请求超时时间，单位毫秒
});

// 可以添加请求拦截器和响应拦截器
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在请求发送之前做些什么
    console.log('Request made with ', config);
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    return response;
  },
  (error) => {
    // 响应错误处理
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
