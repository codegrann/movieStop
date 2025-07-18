import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import authService from '../services/authService';

export const useAuth = () => {
  const { user, token, login, logout, loginWithToken } = useContext(AppContext);

  const loginUser = useCallback(
    async (email: string, password: string) => {
      try {
        const { token: newToken, user: newUser } = await authService.login(
          email,
          password,
        );
        login(newToken, { ...newUser, favorites: [] });
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    },
    [login],
  );

  const registerUser = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const { token: newToken, user: newUser } =
          await authService.register(email, password, name);
        login(newToken, { ...newUser, favorites: [] });
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || 'Registration failed',
        );
      }
    },
    [login],
  );

  const logoutUser = useCallback(() => {
    logout();
  }, [logout]);

  return { user, token, loginUser, loginWithToken, registerUser, logoutUser };
};
