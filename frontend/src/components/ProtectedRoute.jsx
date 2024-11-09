
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';  

//CODE ATTRIBUTION
//https://www.geeksforgeeks.org/how-to-create-a-protected-route-with-react-router-dom/

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
