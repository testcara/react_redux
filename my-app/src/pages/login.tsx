import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/authThunk"; // 导入 Thunk Action
import { RootState } from "../redux/store"; // 引入 RootState 类型
import AuthForm from "../components/AuthForm";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  // 从 Redux store 中获取状态
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = (username: string, password: string) => {
    dispatch(loginUser(username, password)); // 调用 Thunk Action
  };

  return (
    <div>
      <h1>Login</h1>
      <AuthForm
        onSubmit={handleLogin}
        buttonText="Login"
        user={user}
        error={error}
      ></AuthForm>
    </div>
  );
};

export default LoginPage;
