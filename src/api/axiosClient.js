import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://locoshop-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token from localStorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
