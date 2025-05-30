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
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Welcome to MovieStop</h1>
      <RegisterForm onRegister={handleRegister} error={error} />
      <button className='text-white font-bold px-2 py-1 border border-cyan-200 hover:border-cyan-500 hover:text-cyan-500 rounded' onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default RegisterPage;
