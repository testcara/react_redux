import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/thunks/authThunk"; // 导入 Thunk Action
import { RootState } from "./redux/store"; // 引入 RootState 类型

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // 从 Redux store 中获取状态
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(loginUser(username, password));  // 调用 Thunk Action
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      
      {user && <p>Welcome, {user}!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
