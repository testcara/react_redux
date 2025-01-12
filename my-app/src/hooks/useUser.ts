import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  loginUser,
  logout,
  registerUser,
  fetchMe,
} from "../redux/thunks/authThunk";
import { RootState } from "../redux/store";
import { logToLocalStorage } from "../utils/logUtil";
const useUser = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, error} = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(true);

  // 自动获取当前登录用户信息（如果 token 存在）
  useEffect(() => {
    logToLocalStorage(
      "useEffect",
      `begin user: ${user} - ${isAuthenticated},loading: ${loading} `
    );
    setLoading(true);
    if (!user && !isAuthenticated) {
      dispatch(fetchMe());
    }
    if (user && isAuthenticated) {
      setLoading(false);
    }

    if (!localStorage.getItem("token")) {
      setLoading(false);
    }
    logToLocalStorage(
      "useEffect",
      `after user: ${user} - ${isAuthenticated},loading: ${loading} `
    );
  }, [user]); // Only run this effect if user is null (initial load)

  const login = (username: string, password: string) => {
    setLoading(true);
    try {
      dispatch(loginUser(username, password));
    } catch (error: any) {
      logToLocalStorage("login", `Login failed: ${error.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setLoading(true);
    try {
      dispatch(logout());
    } catch (error: any) {
      logToLocalStorage("logout", `logout failed ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const register = (username: string, password: string) => {
    setLoading(true);
    try {
      dispatch(registerUser(username, password));
    } catch (error: any) {
      logToLocalStorage("register", `Register failed: ${error.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  return { user, isAuthenticated, login, logoutUser, register, loading, error };
};

export default useUser;
