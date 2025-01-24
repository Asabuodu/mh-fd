"use client";
import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../../../lib/axios';

// Define form data interface
interface FormData {
  username: string;
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false); // To control success toast visibility
  const [showErrorToast, setShowErrorToast] = useState<string | null>(null); // To show error toast

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form before submitting (simple validation example)
  const validateForm = (): boolean => {
    const formErrors: { email: string; password: string } = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setError(null); // Reset error message
      setShowSuccessToast(false); // Reset success toast visibility before new submission
      setShowErrorToast(null); // Reset error toast visibility before new submission

      try {
        const response = await axiosInstance.post('auth/signin', formData);
        console.log('User logged in successfully:', response.data);

        // Show success toast
        setShowSuccessToast(true);

        // Redirect to home after 2 seconds
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page
        }, 2000); // 2 seconds delay

      } catch (err) {
        if (err instanceof AxiosError) {
          const errorMessage = err.response?.data?.message || err.message;
          console.error('Error during login:', errorMessage);
          
          // Show error toast
          setShowErrorToast(errorMessage);
        } else {
          setError('Unexpected error during login');
          setShowErrorToast('Unexpected error during login');
          console.error('Unexpected error during login:', err);
        }
      } finally {
        setIsLoading(false); // Reset loading state after request
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>

        <form onSubmit={handleSubmit}>
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

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isLoading ? 'Loading...' : 'LOGIN'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          I do not have an account? <a href="/auth/signup" className="text-indigo-600 hover:text-indigo-700">Signup</a>
        </p>

        <p className="mt-4 text-center">
          <a href="/auth/resetpassword" className="text-indigo-600 hover:text-indigo-900 text-lg">Forgotten Password</a>
        </p>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
          <p>Login Successful! Redirecting...</p>
        </div>
      )}

      {/* Error Toast */}
      {showErrorToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg">
          <p>{showErrorToast}</p>
        </div>
      )}
    </div>
  );
};

export default Signin;
