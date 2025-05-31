import React from 'react'
import { useAuth } from '../hooks/useAuth';

function Home() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-6">Welcome, {user?.name}!</h1>
      <button
        onClick={logoutUser}
        className="px-6 py-3 bg-red-600 rounded hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
