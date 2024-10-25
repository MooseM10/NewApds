import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;

    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://localhost:8000/login', { username, password });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ username: '', password: '' });
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={loginUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username: 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}