import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/thunks/authThunk"; // 导入 Thunk Action
import { GridItem, Grid } from "@patternfly/react-core";
import { RootState } from "../redux/store"; // 引入 RootState 类型
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AlertSuccessModal } from "../components/AlertModal";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 从 Redux store 中获取状态
  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 关闭 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/login')
  };
  // 监听 isAuthenticated 状态变化来显示 modal
  useEffect(() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);
  const handleRegister = (username: string, password: string) => {
    dispatch(registerUser(username, password)); // 调用 Thunk Action
    console.log(`after register...${isAuthenticated}`);
    setIsModalOpen(true);
  };

  return (
    <div className="inner">
      <Grid>
        <GridItem span={4}>
          <AuthForm onSubmit={handleRegister} error={error} buttonText="注册" />
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      {!error && (
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