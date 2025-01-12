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
import usePost from "./hooks/usePost";
import CreatePost from "./pages/createPost";
import MyPosts from "./pages/myPosts";
import EditPost from "./pages/editPost";
import PostPage from "./pages/post";

const App: React.FC = () => {
  const {
    error: authError,
    user,
    isAuthenticated,
    login,
    logoutUser,
    register,
    loading: authLoading,
  } = useUser();
  const { error: postError, create, edit, drop, posts } = usePost();

  return (
    <>
      <Router>
        <UserTab
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logoutUser}
        />
        <Header />
        <Routes>
          <Route
            path="/register"
            element={
              <RegisterPage
                registerUser={register}
                errorMsg={authError}
                isAuth={isAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                loginUser={login}
                errorMsg={authError}
                isAuth={isAuthenticated}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                notReady={authLoading}
                username={user}
              >
                {
                  <HomePage
                    username={user}
                    deletePost={drop}
                    editPost={edit}
                    posts={posts}
                  />
                }
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                notReady={authLoading}
                username={user}
              >
                {<CreatePost createPost={create} errorMessage={postError} />}
              </PrivateRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                notReady={authLoading}
                username={user}
              >
                {
                  <MyPosts
                    username={user}
                    posts={posts}
                    editPost={edit}
                    deletePost={drop}
                  />
                }
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                notReady={authLoading}
                username={user}
              >
                {<EditPost posts={posts} editPost={edit} />}
              </PrivateRoute>
            }
          />

          <Route
            path="/post/:id"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                notReady={authLoading}
                username={user}
              >
                {<PostPage posts={posts} username={user} />}
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
