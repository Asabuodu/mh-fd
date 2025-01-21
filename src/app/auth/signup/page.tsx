"use client"
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../../../lib/axios';
// import "..globals.css';"; 


// Create an axios instance with a base URL
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your actual base URL
// });

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      // ...formData,
        ...prev,
      [name]: value,
    }));
  }

    // Validate form before submitting (simple validation example
  const validateForm = () : boolean => {
    const formErrors: { username: string; email: string; password: string } = { username: '', email: '', password: '' };
    let isValid = true;

    if (!formData.username) {
      formErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

   // Handle form submission

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
        // Validate the form before submitting
    if (validateForm()) {
      setIsLoading(true);
      setError(null); // Reset error message

      try {
        const response = await axiosInstance.post('auth/signup', formData);
        console.log('User signed up successfully:', response.data);

        // Optionally, redirect or notify the user
        // Example: window.location.href = '/dashboard';
        window.location.href = '/auth/login';

      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error('Error during signup:', errorMessage); //set error message to display
        } else {
          setError('Unexpected error during signup');
          console.error('Unexpected error during signup:', error);
        }
      } finally {
        setIsLoading(false);  // Reset loading state after request
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            {/* Sign Up */}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/auth/login" className="text-indigo-600 hover:text-indigo-700">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
