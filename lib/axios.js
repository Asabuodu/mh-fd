// // lib/axios.js
// import axios from 'axios';

// // Create an axios instance with base URL
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/', // Your API URL here
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Optionally, you can intercept requests or responses here

// // Request interceptor (optional, if you need to add tokens or modify requests)

// axiosInstance.interceptors.request.use((config) => {
//   // You can add authorization token here if needed4
//   const token = localStorage.getItem('token'); // Example: Get token from localStorage
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Response interceptor (optional)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle global errors (e.g., show an error message)
//     if (error.response && error.response.data) {
//       console.error(error.response.data.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



// lib/axios.js
import axios from 'axios';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/', // Use environment variable for API URL
  headers: {
    'Content-Type': 'application/json', // Set default headers for JSON requests
  },
});

// Request interceptor to handle authentication tokens
axiosInstance.interceptors.request.use((config) => {
  // Check if token is available in localStorage (only works in the client-side)
  const token = typeof window !== 'undefined' && localStorage.getItem('token'); // Check for browser environment
  if (token) {
    // Attach the token to the Authorization header if it's present
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, such as showing a message to the user
    if (error.response && error.response.data) {
      console.error('API Error:', error.response.data.message);
      // You can also implement custom error handling here, like showing a user-friendly message
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
