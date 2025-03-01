import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!Cookies.get("accessToken"); 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;