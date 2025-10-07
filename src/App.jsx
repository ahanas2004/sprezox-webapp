import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './layout/RootLayout';
import LearnPage from './pages/LearnPage';
import NetworkPage from './pages/NetworkPage';
import ProfilePage from './pages/ProfilePage';
import SignInScreen from './features/auth/SignInScreen';
import ProtectedRoute from './components/core/ProtectedRoute';
import IdeasPage from './pages/IdeasPage'; // <-- ADD THIS IMPORT

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignInScreen />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<RootLayout />}>
                <Route index element={<LearnPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/ideas" element={<IdeasPage />} /> {/* <-- ADD THIS ROUTE */}
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}