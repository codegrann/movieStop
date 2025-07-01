import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      // Clear user session here - call logout from context or localStorage clear
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login page
      // history.push('/login');
      window.location.href = '/login';
      window.location.reload(); // force refresh to reset React state
    }
    return Promise.reject(error);
  }
);

export default API;
