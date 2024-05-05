// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  let auth = useSelector(state => state.user.email);
  return auth === null ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;