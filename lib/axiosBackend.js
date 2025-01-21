// lib/axiosBackend.js
import axios from 'axios';

// Create a separate axios instance for backend API requests
const axiosBackendInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, you can intercept requests or responses here

export default axiosBackendInstance;
