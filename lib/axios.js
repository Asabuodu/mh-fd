// lib/axios.js
import axios from 'axios';

// Create an axios instance with base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/', // Your API URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, you can intercept requests or responses here

// Request interceptor (optional, if you need to add tokens or modify requests)

axiosInstance.interceptors.request.use((config) => {
  // You can add authorization token here if needed4
  const token = localStorage.getItem('token'); // Example: Get token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., show an error message)
    if (error.response && error.response.data) {
      console.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
