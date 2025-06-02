import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const register = async (email: string, password: string, name: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/register`, { email, password, name });
  return response.data;
};

const authService = { login, register };
export default authService;
