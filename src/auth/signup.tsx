// import { useState } from 'react';


// export default function Signup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let formErrors: { username: string; email: string; password: string } = {
//       username: '',
//       email: '',
//       password: '',
//     };
//     let isValid = true;

//     if (!formData.username) {
//       formErrors.username = 'Username is required';
//       isValid = false;
//     }

//     if (!formData.email) {
//       formErrors.email = 'Email is required';
//       isValid = false;
//     }

//     if (!formData.password) {
//       formErrors.password = 'Password is required';
//       isValid = false;
//     }

//     setErrors(formErrors);
//     return isValid;
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log('Form data submitted:', formData);
//       // Add your logic to handle the form submission (e.g., API call to register the user)
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           {errors.username && <p className="error">{errors.username}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </div>

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }



import { useState } from 'react';
import axios from 'axios';


// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual base URL
});

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors: { username: string; email: string; password: string } = { username: '', email: '', password: '' };
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
  };


        //The axios path that handles the api call to the server to submit the signup page

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post('signup', formData); // Use the axios instance
  //       console.log('User signed up successfully:', response.data);
  //       // Redirect user to login page or dashboard on success
  //     } catch (error) {
  //       const errorMessage = (error as any).response?.data?.message || (error as any).message;
  //       console.error('Error during signup:', errorMessage);
  //       // Handle errors, e.g., display an error message to the user
  //     }
  //   }
  // };




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // If you're using the axiosInstance, you don't need to prepend baseURL.

        const response = await axiosInstance.post('auth/dto/signup', formData);
        console.log('User signed up successfully:', response.data);

        // Redirect user to login page or dashboard on success
      } catch (error) {
        const errorMessage = (error as any).response?.data?.message || (error as any).message;
        console.error('Error during signup:', errorMessage);
        // Handle errors, e.g., display an error message to the user
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/auth/login" className="text-indigo-600 hover:text-indigo-700">Login</a>
        </p>
      </div>
    </div>
  );
}
