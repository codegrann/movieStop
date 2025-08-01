import React, { useState } from 'react';

interface Props {
  onLogin: (email: string, password: string) => void;
  error: string | null;
  loading: boolean;
}

const LoginForm = ({ onLogin, error, loading }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Sign In
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="w-full py-3 bg-cyan-600 rounded hover:bg-cyan-500 transition-colors font-semibold disabled:bg-gray-500"
        disabled={loading}
      >
        {loading ? 'Please wait...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;
