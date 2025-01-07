// Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunks/authThunk" // 导入 loginUser action

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await dispatch(loginUser(username, password));

    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
