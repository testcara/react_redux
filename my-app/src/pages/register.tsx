import React, { useState, useEffect } from "react";
import { GridItem, Grid } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AlertSuccessModal } from "../components/AlertModal";

interface RegisterPageProp {
  registerUser: (username:string, passowrd:string)=>void
  isAuth: boolean
  errorMsg?: string | null
}
const RegisterPage: React.FC<RegisterPageProp>= ({registerUser, isAuth, errorMsg}) => {
  const navigate = useNavigate();
  // 从 Redux store 中获取状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 关闭 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/login')
  };
  // 监听 isAuthenticated 状态变化来显示 modal
  useEffect(() => {
    if (isAuth) {
      setIsModalOpen(true);
    }
  }, [isAuth]);
  const handleRegister = (username: string, password: string) => {
    registerUser(username, password); // 调用 Thunk Action
    console.log(`after register...${isAuth}`);
    setIsModalOpen(true);
  };

  return (
    <div className="inner">
      <Grid>
        <GridItem span={4}>
          <AuthForm onSubmit={handleRegister} error={errorMsg} buttonText="注册" />
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      {!errorMsg && (
        <AlertSuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="注册成功"
        />
      )}
    </div>
  );
};

export default RegisterPage;