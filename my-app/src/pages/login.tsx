import React, { useState, useEffect } from "react";
import { GridItem, Grid, Button } from "@patternfly/react-core";
import { Link, useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AlertSuccessModal } from "../components/AlertModal";
interface LoginPageProp {
  loginUser: (username:string, passowrd:string) => void
  errorMsg: string | null
  isAuth: boolean
}

const LoginPage: React.FC<LoginPageProp> = ({loginUser, errorMsg, isAuth}) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false)
  // 关闭 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    // 延迟跳转，确保 Modal 关闭后跳转
    setTimeout(() => {
      navigate("/");
    }, 100); // 设置延迟时间来确保 Modal 关闭
  };
  // 监听 isAuthenticated 状态变化来显示 modal
  useEffect(() => {
    if (isAuth) {
      setIsModalOpen(true);
    }
  }, [isAuth]);
  const handleLogin = (username: string, password: string) => {
    loginUser(username, password); // 调用 Thunk Action
    console.log(`after login...${isAuth}`);
    setIsModalOpen(true);
    setSuccess(true)
  };

  return (
    <div className="inner">
      <Link to="/register">
        <Button type="button">注册</Button>
      </Link>
      <Grid>
        <GridItem span={4}>
          <AuthForm onSubmit={handleLogin} error={errorMsg} buttonText="登录" />
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      {!errorMsg && success && (
        <AlertSuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="登录成功！"
        />
      )}
    </div>
  );
};

export default LoginPage;
