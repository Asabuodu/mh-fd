"use client";
import { useState } from 'react';
import axiosInstance from '../../../../../lib/axios';
import { isAxiosError } from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false); // To control the visibility of the success message
  const [showErrorToast, setShowErrorToast] = useState<string | null>(null); // To show error messages as a toast

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const formErrors: { username: string; email: string; password: string; confirm_password: string } = { username: '', email: '', password: '', confirm_password: '' };
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

    if (!formData.confirm_password) {
      formErrors.confirm_password = 'Confirm password is required';
      isValid = false;
    }

    if (formData.password !== formData.confirm_password) {
      formErrors.confirm_password = 'Passwords do not match';
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setShowSuccessToast(false); // Reset success toast visibility before new submission
    setShowErrorToast(null); // Reset error toast visibility before new submission

    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await axiosInstance.post('auth/signup', formData);
        console.log('User signed up successfully:', response.data);

        // Show success toast
        setShowSuccessToast(true);

        // Redirect after a brief delay
        setTimeout(() => {
          window.location.href = './signin'; // Redirect to signin page
        }, 2000); // 2 seconds delay

      } catch (err) {
        if (isAxiosError(err)) {
          const errorMessage = (err.response?.data as { message?: string })?.message || err.message;

          if (errorMessage.includes('User with this email already exists')) {
            setError('This email is already registered. Please use a different one.');
          } else {
            setError('An unexpected error occurred. Please try again later.');
          }

          // Show error toast
          setShowErrorToast(errorMessage);
          console.error('Error during signup:', err);
        } else {
          setError('An unexpected error occurred. Please try again later.');
          setShowErrorToast('An unexpected error occurred. Please try again later.');
          console.error('Unexpected error during signup:', err);
        }
      } finally {
        setIsLoading(false);
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

          <div className="mb-6">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="./signin" className="text-indigo-600 hover:text-indigo-700">Login</a>
        </p>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
          <p>Signup Successful! Redirecting to login page...</p>
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

export default Signup;
