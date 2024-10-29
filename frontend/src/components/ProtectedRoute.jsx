// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext'; // Adjust the import based on your context file structure

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useUserContext(); // Assume this returns whether the user is authenticated

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;
