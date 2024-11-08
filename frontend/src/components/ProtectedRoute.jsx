import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext'; // Adjust the import based on your context file structure

const ProtectedRoute = ({ children  }) => {
    const { user } = useUserContext(); // Use 'user' from context, assuming 'user' will be null if not authenticated

    return user ? children  : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
