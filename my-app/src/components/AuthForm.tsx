// components/AuthForm.tsx
import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (username: string, password: string) => void;
  buttonText: string;
  user?: string | null;
  error?: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonText, user, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(username, password); // 调用传入的 onSubmit 函数
  };

  return (
    <div>
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
      <button onClick={handleSubmit}>{buttonText}</button>
      {user && <p>Welcome, {user}!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AuthForm;
