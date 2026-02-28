import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './layout/RootLayout';
import PublicLayout from './layout/PublicLayout';
import LearnPage from './pages/LearnPage';
import NetworkPage from './pages/NetworkPage';
import ProfilePage from './pages/ProfilePage';
import SignInScreen from './features/auth/SignInScreen';
import ProtectedRoute from './components/core/ProtectedRoute';
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/Landingpage';
import PublicRoute from './components/core/PublicRoute';

// New Public Pages
import AboutPage from './pages/AboutPage';
import VenturesPage from './pages/VenturesPage';
import AppVenturePage from './pages/AppVenturePage';
import EdTechPage from './pages/EdTechPage';
import StartupEcoPage from './pages/StartupEcoPage';
import SchoolsPage from './pages/SchoolsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes - with public nav */}
              <Route element={<PublicRoute />}>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/ventures" element={<VenturesPage />} />
                  <Route path="/ventures/app" element={<AppVenturePage />} />
                  <Route path="/ventures/edtech" element={<EdTechPage />} />
                  <Route path="/startup-ecosystem" element={<StartupEcoPage />} />
                  <Route path="/schools-colleges" element={<SchoolsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Route>
                <Route path="/signin" element={<SignInScreen />} />
              </Route>

              {/* Protected Routes - with app nav */}
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
