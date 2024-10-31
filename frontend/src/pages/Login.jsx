import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { LogOut, User } from 'lucide-react'


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
  <div className="min-h-screen" style={{ backgroundColor: '#252425' }}>
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">APDS7311 International Payment Portal</span>
            </div>
            {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Register
              </a>
              <a href="#" className="border-purple-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Login
              </a>
            </div> */}
          </div>
          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div> */}
        </div>
      </div>
    </nav>

    <main className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="shadow" style={{ backgroundColor: '#2a292a' }}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-100">Login Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginUser} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Username: 
              </label>
              <Input
                type="text"
                id="username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                placeholder="Enter username"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password:
              </label>
              <Input
                type="password"
                id="password"
                value={data.password} 
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Enter password"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  </div>
)
}

