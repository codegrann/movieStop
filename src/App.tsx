import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';

import { useAuth } from './hooks/useAuth'; // custom hook to get auth state

// Protected route component to guard private routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const AuthHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
  
          const user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name || '',
          };
  
          login(token, user);
          navigate(location.pathname, { replace: true });
        } catch (e) {
          console.error('Invalid token:', e);
        }
      }
    }, [location.search, login, navigate, location.pathname]);
  
    return null; // This component only handles login side effect
  };

  return (
    <Router>
      <AuthHandler />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
