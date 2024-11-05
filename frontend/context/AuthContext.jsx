// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Manage user data

  const login = async (username, password) => {
    try {
      const response = await axios.post('/login', { username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data); // Assuming response contains user data
        localStorage.setItem('token', response.data.token); // Save token if needed
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., notify the user)
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout'); // Call the logout API endpoint
      setIsAuthenticated(false);
      setUser(null); // Clear user data
      localStorage.removeItem('token'); // Remove token if stored
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (e.g., notify the user)
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
