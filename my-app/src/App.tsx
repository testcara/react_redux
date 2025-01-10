import React from "react";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/home";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserTab from "./components/UserTab";

const App: React.FC = () => {
  const {isAuthenticated} = useSelector((state: any) => state.auth);

  return (
    <>
      <Router>
      <UserTab isAuthenticated={isAuthenticated} />
        <Header/>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}>{<HomePage />}</PrivateRoute>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
