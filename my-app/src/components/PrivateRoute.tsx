import React from 'react';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  console.log(`prive route: ${isAuthenticated}`)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
