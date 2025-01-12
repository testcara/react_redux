import React from 'react';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  notReady: boolean;
  username: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, username, isAuthenticated, notReady }) => {
  console.log(`prive route: ${isAuthenticated}, username: ${username}, loading: ${notReady}`)
  if (notReady) return <div className='inner'>loading...</div>
  if (!isAuthenticated && !username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
