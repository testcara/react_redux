import React from "react";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>ßß
        </Routes>
      </Router>
    </>
  );
};

export default App;
