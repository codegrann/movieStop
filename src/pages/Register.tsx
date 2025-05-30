import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;

  const handleRegister = async (email: string, password: string, name: string) => {
    setError(null);
    try {
      await registerUser(email, password, name);
      navigate('/');
    } catch {
      setError('Failed to register. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <RegisterForm onRegister={handleRegister} error={error} />
    </div>
  );
};

export default RegisterPage;
