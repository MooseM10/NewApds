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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000', // black background
      color: '#FFD700', // yellow text color
      padding: '20px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#333',
        borderRadius: '8px',
        padding: '30px',
      }}>
        <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={loginUser}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #FFD700',
                backgroundColor: '#222',
                color: '#FFD700',
              }}
              placeholder="Enter username"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #FFD700',
                backgroundColor: '#222',
                color: '#FFD700',
              }}
              placeholder="Enter password"
            />
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <input
              type="checkbox"
              checked={data.rememberMe}
              onChange={(e) => setData({ ...data, rememberMe: e.target.checked })}
              style={{ marginRight: '5px' }}
            />
            <label>Remember me</label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FFD700',
              color: '#000',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <a href="#" style={{ color: '#FFD700', textDecoration: 'none' }}>
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
} 