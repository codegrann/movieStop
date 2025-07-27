// import axios from 'axios';
import API from './api';

// const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await API.post(`/auth/login`, { email, password });
  return response.data;
};

const register = async (
  email: string,
  password: string,
  name: string
): Promise<LoginResponse> => {
  const response = await API.post(`/auth/register`, { email, password, name });
  return response.data;
};

const authService = { login, register };
export default authService;
