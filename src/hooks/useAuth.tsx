import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import authService from '../services/authService';

export const useAuth = () => {
  const { user, token, login, logout } = useContext(AppContext);

  const loginUser = async (email: string, password: string) => {
    const { token: newToken, user: newUser } = await authService.login(email, password);
    login(newToken, newUser);
  };

  const registerUser = async (email: string, password: string, name: string) => {
    const { token: newToken, user: newUser } = await authService.register(email, password, name);
    login(newToken, newUser);
  };

  const logoutUser = () => {
    logout();
  };

  return { user, token, loginUser, registerUser, logoutUser };
};
