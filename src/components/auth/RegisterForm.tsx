import React, { useState } from 'react';

interface Props {
  onRegister: (email: string, password: string, name: string) => void;
  error: string | null;
}

const RegisterForm = ({ onRegister, error }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

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
        className="w-full py-3 bg-cyan-600 rounded hover:bg-cyan-500 transition-colors font-semibold"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
