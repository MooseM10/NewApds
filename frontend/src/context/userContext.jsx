import axios from 'axios';
import React,  { createContext, useState, useEffect } from 'react';

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
            await axios.post('/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, isFetchingUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export separately at the end
export { UserContext, UserContextProvider };
