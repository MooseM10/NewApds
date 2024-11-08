import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';

// Axios default configuration
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Create the context
export const UserContext = createContext();

// Custom hook to use the UserContext in other components
export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/profile');  // Replace with actual profile endpoint
                console.log('User data fetched from backend:', data);
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);  // If fetching fails, set user to null
            } finally {
                setIsFetchingUser(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            localStorage.removeItem('token');  // Clear token if stored in localStorage
            await axios.post('/logout');  // Logout from backend
            setUser(null);  // Reset user state
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, isFetchingUser }}>
            {children}
        </UserContext.Provider>
    );
};
