import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  console.log("token is : "+ token)

  if (!token) return <Navigate to="/login" replace />;

  try {
   const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // in seconds

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    return children;

  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
