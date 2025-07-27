import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-border min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Welcome to MovieStop
      </h1>
      <LoginForm onLogin={handleLogin} error={error} loading={loading} />
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}
        className="block text-center underline text-blue-300"
      >
        Sign in with Google
      </a>

      <button
        className="text-white font-bold px-2 py-1 border border-cyan-200 hover:border-cyan-500 hover:text-cyan-500 rounded"
        onClick={() => navigate('/register')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default LoginPage;
