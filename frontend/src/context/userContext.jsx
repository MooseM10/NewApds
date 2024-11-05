import axios from 'axios';
import React,  { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Set up Axios defaults (or configure a custom instance if needed)
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setIsFetchingUser(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            const response = await axios.post('/logout');
            if (response.status === 200) {
                setUser(null); // Clear user state on successful logout
                toast.success('Logged out successfully!'); // Optional: notify the user
            }
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.'); // Optional: notify the user
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, isFetchingUser,logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Export separately at the end
export { UserContext, UserContextProvider };
