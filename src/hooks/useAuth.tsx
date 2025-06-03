import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import authService from '../services/authService';

export const useAuth = () => {
  const { user, token, login, logout } = useContext(AppContext);

  const loginUser = async (email: string, password: string) => {
    try {
      const { token: newToken, user: newUser } = await authService.login(email, password);
      login(newToken, newUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const loginWithToken = (token: string, user: User) => {
    login(token, user);
  };

  const registerUser = async (email: string, password: string, name: string) => {
    try {
      const { token: newToken, user: newUser } = await authService.register(email, password, name);
      login(newToken, newUser);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logoutUser = () => {
    logout();
  };

  return { user, token, loginUser, loginWithToken, registerUser, logoutUser };
};
