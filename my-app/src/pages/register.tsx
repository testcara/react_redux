import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/thunks/authThunk"; // 导入 Thunk Action
import { RootState } from "../redux/store"; // 引入 RootState 类型
import AuthForm from "../components/AuthForm";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();

  // 从 Redux store 中获取状态
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (username: string, password: string) => {
    dispatch(registerUser(username, password)); // 调用 Thunk Action
  };

  return (
    <div>
      <h1>Register</h1>
      <AuthForm
        onSubmit={handleRegister}
        buttonText="Register"
        user={user}
        error={error}
      ></AuthForm>
    </div>
  );
};

export default RegisterPage;
