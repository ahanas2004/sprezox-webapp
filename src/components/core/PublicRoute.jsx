import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicRoute() {
  const { session, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <div className="loading-screen">Loading Ecosystem...</div>;
  }

  // If user is already logged in, redirect to home page
  if (session) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, show the public page (Landing or SignIn)
  return <Outlet />;
}