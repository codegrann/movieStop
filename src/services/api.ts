import axios from 'axios';
import { logoutUser } from '../hooks/useAuth'; // or your logout logic

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Create browser history to use navigate outside React components
// const history = createBrowserHistory();

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
