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

   // Define regex patterns
   const usernamePattern = /^[a-zA-Z0-9]{4,15}$/;  // Alphanumeric, 4-15 characters
   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;  // Minimum 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number
 
   const loginUser = async (e) => {
     e.preventDefault();
     const { username, password } = data;
 
     // Validate username with regex
     if (!usernamePattern.test(username)) {
       toast.error('Username should be 4-15 characters and contain only letters and numbers');
       return;
     }
 
     // Validate password with regex
     if (!passwordPattern.test(password)) {
       toast.error('Password must be at least 6 characters, contain 1 uppercase letter, 1 lowercase letter, and 1 number');
       return;
     }



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

