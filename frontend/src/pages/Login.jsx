'use client'

import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Lock, User, CreditCard } from 'lucide-react'
import { UserContext } from '../context/userContext';  // Ensure the context is imported

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);  // Destructure the setUser function from context
  const [data, setData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async (e) => {
    e.preventDefault()
    const { username, password } = data

    if (!username || !password) {
      toast.error('Please enter both username and password.')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post('https://localhost:8000/login', { username, password })

      if (response.data.error) {
        toast.error(response.data.error)
      } else {
        // Assuming response.data contains the user data. Adjust based on your API response structure
        const user = response.data.user;  // Extract user data from response
        setUser(user);  // Store user data in context
        setData({ username: '', password: '', rememberMe: false })
        navigate('/dashboard')  // Navigate to the dashboard upon successful login
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <h2 className="text-2xl font-bold text-center text-white">APDS7311 International Payment Portal</h2>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Login to Your Account</h3>
          <form onSubmit={loginUser} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={data.rememberMe}
                onChange={(e) => setData({ ...data, rememberMe: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <CreditCard className="text-white mr-2" />
        <span className="text-white font-medium">Secure Payment Gateway</span>
      </div>
    </div>
  )
}
