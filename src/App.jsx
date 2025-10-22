import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './layout/RootLayout';
import LearnPage from './pages/LearnPage';
import NetworkPage from './pages/NetworkPage';
import ProfilePage from './pages/ProfilePage';
import SignInScreen from './features/auth/SignInScreen';
import ProtectedRoute from './components/core/ProtectedRoute';
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/Landingpage';
import PublicRoute from './components/core/PublicRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInScreen />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<RootLayout />}>
                  <Route path="/home" element={<LearnPage />} />
                  <Route path="/network" element={<NetworkPage />} />
                  <Route path="/ideas" element={<IdeasPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}