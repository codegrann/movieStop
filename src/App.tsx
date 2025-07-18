import { useEffect } from 'react';
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
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import AccountDetailsPage from './pages/AccountDetails';

// Protected route component to guard private routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // store intended path in sessionstorage
    sessionStorage.setItem('redirectAfterLogin', location.pathname);

    return <Navigate to="/login" replace />;
  }
  return children;
};
const AuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    // console.log('params to use to decode', params);
    // console.log('Token to decode', token);

    // Check if token is present
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded);

        const user = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name || '',
          favorites: decoded.favorites || [],
        };

        loginWithToken(token, user);

        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath, { replace: true });
        // navigate(location.pathname, { replace: true });
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }
  }, [location.search, loginWithToken, navigate, location.pathname]);

  return null;
};

const App = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // Token expired
        logoutUser();
      } else {
        return;
      }
    }
  }, []);

  return (
    <Router>
      <AuthHandler />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <HomePage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <MovieDetailsPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <FavoritesPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AccountDetailsPage />
              </>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
