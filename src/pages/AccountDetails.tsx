import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import API from '../services/api';

const AccountDetailsPage = () => {
  const { user, token, logoutUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    setMessage(null);
    setError(null);

    try {
      const updateData: { name?: string; password?: string } = {};
      if (name !== user?.name) updateData.name = name;
      if (password) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        setMessage('Nothing to update.');
        return;
      }

      await API.put('/user/account', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessage('Account updated successfully!');
      setPassword('');
      // Update local storage
      localStorage.setItem('user', JSON.stringify({ ...user, name }));
     
    } catch (err: any) {
      setError(err.response?.data?.message);
      // console.log('Error updating account:', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      await API.delete('/user/account', {
        headers: { Authorization: `Bearer ${token}` },
      });
      logoutUser();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete account.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white p-6 mx-auto pt-20">
      <div className=" bg-gray-900 p-6 max-w-md mx-auto rounded-md">
        <h1 className="text-3xl font-bold mb-6">Account Details</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email (read-only)</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Change Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        </div>

        {message && <p className="mb-4 text-green-400">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <button
          onClick={handleUpdate}
          className="w-full mb-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded font-semibold"
        >
          Update Account
        </button>

        <hr className="border-gray-700 my-6" />

        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          {isDeleting ? 'Deleting Account...' : 'Delete Account'}
        </button>

        <button
          onClick={logoutUser}
          className="w-full mt-6 py-2 bg-gray-700 hover:bg-gray-600 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
