import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Preloader from './SimpleLoader';
import Register from '../pages/auth/register/Index';


const ProtectedRoute = ({ children }) => {
  const { user, appLoad } = useAuth();

  
  if (appLoad) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(!user?.firstName){
    return <Register />
  }

  return children;
};

export default ProtectedRoute;
