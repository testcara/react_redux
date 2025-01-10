import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/thunks/authThunk";


const UserTab: React.FC<any> = ({isAuthenticated}) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const username = useSelector((state: any)=> state.auth.user) || "Guest"
  const dispatch = useDispatch();
  const hanldeLogout = ()=> {
    dispatch(logout())
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