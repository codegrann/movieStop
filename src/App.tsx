import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';

import { useAuth } from './hooks/useAuth'; // custom hook to get auth state
import Navbar from './components/layout/Navbar';

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
    const { loginWithToken } = useAuth();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      console.log('params to use to decode', params);
      console.log('Token to decode', token);
  
      // Check if token is present
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          console.log('Decoded token:', decoded);
  
          const user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name || '',
          };
  
          loginWithToken(token, user);
          console.log('User logged in:', user);
          navigate(location.pathname, { replace: true });
        } catch (e) {
          console.error('Invalid token:', e);
        }
      }
    }, [location.search, loginWithToken, navigate, location.pathname]);
  
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
        {/* <Route
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
        /> */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/:id" element={<MovieDetailsPage />} />
              </Routes>
            </>
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
