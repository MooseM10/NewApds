
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';  // This is a custom hook for getting auth state

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <div className="protected-route-wrapper"> {/* This could affect layout */}
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };
  
export default ProtectedRoute;
