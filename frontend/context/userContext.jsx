// import axios from 'axios';
// import { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Check for a valid session or token before making the request
//         const fetchUser = async () => {
//             try {
//                 const { data } = await axios.get('/profile'); // Adjust this URL based on your API
//                 setUser(data);
//             } catch (error) {
//                 console.error('Failed to fetch user:', error);
//                 // Optionally handle error state here
//                 setUser(null); // Ensure user is null if there is an error
//             }
//         };

//         // Call fetchUser only if user is not already set
//         if (!user) {
//             fetchUser();
//         }
//     }, [user]); // Adding user to the dependency array allows for re-fetching when necessary

//     const logout = async () => {
//         try {
//             await axios.post('/logout'); // Call your logout endpoint
//             setUser(null); // Clear user data on logout
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <UserContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

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
        <UserContext.Provider value={{ user, setUser, logout, isFetchingUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export separately at the end
export { UserContext, UserContextProvider };
