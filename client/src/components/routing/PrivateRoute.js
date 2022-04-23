import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const { isAuthenticated, loading } = authContext;
  return !isAuthenticated && !loading ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;
