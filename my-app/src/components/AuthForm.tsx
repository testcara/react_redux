import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
  Alert,
  InputGroupText,
  InputGroup,
} from "@patternfly/react-core";
import {AuthFormProps} from "../types/UserType"

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonText, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认的表单提交行为
    onSubmit(username, password); // 调用传入的 onSubmit 函数
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup label="用户名" style={{ width: "88%" }}>
          <TextInput
            isRequired
            id="username"
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            placeholder="请输入用户名"
          />
        </FormGroup>
        <FormGroup label="密码">
          <InputGroup style={{ width: "100%" }}>
            <TextInput
              type={showPassword ? "text" : "password"}
              isRequired
              id="password"
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              placeholder="请输入密码"
            />
            <InputGroupText>
              <Button
                type="button"
                variant="link"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "隐藏" : "显示"}
              </Button>
            </InputGroupText>
          </InputGroup>
        </FormGroup>
        {error && <Alert variant="danger" title={error} />}
        <Button className="button" type="submit">
          {buttonText}
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;