import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',  // Change from email to username
    password: '',  // Ensure 'Password' is lowercase to match the key
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;  // Update destructuring to include username
    try {
      const { data } = await axios.post('/login', {
        username,  // Send username instead of email
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={loginUser}>
      <label>Username</label>
      <input
        type='text'
        placeholder='Enter username'
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <label>Password</label>
      <input
        type='password'
        placeholder='Enter password'
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button type='submit'>Login</button>
    </form>
  </div>
  );
}

