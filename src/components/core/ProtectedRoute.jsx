import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading Ecosystem...</div>;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}