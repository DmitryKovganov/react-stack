import {
    Navigate,
    useLocation,
  } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";

export const ProtectedRoute = (props: any) => {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();
  
    if (!isAuthenticated) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  
    return props.children;
  };