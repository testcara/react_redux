import React from "react";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserTab from "./components/UserTab";
import useUser from "./hooks/useUser";

const App: React.FC = () => {
  const { error, user, isAuthenticated, login, logoutUser, register, loading } = useUser();

  return (
    <>
      <Router>
      <UserTab isAuthenticated={isAuthenticated} user={user} logout={logoutUser}/>
        <Header/>
        <Routes>
          <Route path="/register" element={<RegisterPage registerUser={register} errorMsg={error} isAuth={isAuthenticated} />}/>
          <Route path="/login" element={<LoginPage loginUser={login} errorMsg={error} isAuth={isAuthenticated} />}/>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} notReady={loading} username={user} >{<HomePage />}</PrivateRoute>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
