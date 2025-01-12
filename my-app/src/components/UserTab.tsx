import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";

const UserTab: React.FC<any> = ({isAuthenticated, user, logout}) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const username = user || "Guest"
  const hanldeLogout = ()=> {
    logout()
  }

  return (
    <div className="usertab">
      你好，{`${username}!  `}
      { isAuthenticated ? (
        <Button onClick={hanldeLogout} variant="danger">
          退出登陆
        </Button>
      ) : (
        <Button onClick={handleLoginRedirect} variant="primary">
          登录
        </Button>
      )}
    </div>
  );
};
export default UserTab;