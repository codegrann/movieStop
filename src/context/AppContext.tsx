import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { User, Genre } from '../types';
import { getGenres } from '../services/api';

interface AppContextType {
  user: User | null;
  token: string | null;
  genres: Genre[];
  selectedGenre: Genre | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loginWithToken: (token: string, user: User) => void;
  selectGenre: (genre: Genre | null) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  token: null,
  genres: [],
  selectedGenre: null,
  login: () => {},
  logout: () => {},
  loginWithToken: () => {},
  selectGenre: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setGenres(response.data);
      } catch (error) {
        console.error('Failed to fetch genres', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const loginWithToken = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  }, []);

  const selectGenre = useCallback((genre: Genre | null) => {
    setSelectedGenre(genre);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      genres,
      selectedGenre,
      login,
      logout,
      loginWithToken,
      selectGenre,
    }),
    [user, token, genres, selectedGenre, login, logout, loginWithToken, selectGenre],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
