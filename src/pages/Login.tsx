import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await loginUser(email, password);
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <LoginForm onLogin={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
