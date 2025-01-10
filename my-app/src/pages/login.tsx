import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/authThunk"; // 导入 Thunk Action
import { GridItem, Grid, Button } from "@patternfly/react-core";
import { RootState } from "../redux/store"; // 引入 RootState 类型
import { Link, useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { AlertSuccessModal } from "../components/AlertModal";

const LoginPage: React.FC = () => {
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
    // 延迟跳转，确保 Modal 关闭后跳转
    setTimeout(() => {
      navigate("/");
    }, 3000); // 设置延迟时间来确保 Modal 关闭
  };
  // 监听 isAuthenticated 状态变化来显示 modal
  useEffect(() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);
  const handleLogin = (username: string, password: string) => {
    dispatch(loginUser(username, password)); // 调用 Thunk Action
    console.log(`after login...${isAuthenticated}`);
    setIsModalOpen(true);
  };

  return (
    <div className="inner">
      <Link to="/register">
        <Button type="button">注册</Button>
      </Link>
      <Grid>
        <GridItem span={4}>
          <AuthForm onSubmit={handleLogin} error={error} buttonText="登陆" />
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      {!error && isAuthenticated && (
        <AlertSuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="登陆成功！"
        />
      )}
    </div>
  );
};

export default LoginPage;
