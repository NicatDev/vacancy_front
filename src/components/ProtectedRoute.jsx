// src/components/ProtectedRoute.js

// React'i import ettiğinizden emin olun!
import React from 'react'; 
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ... (yorumlar) ...
 * @returns {JSX.Element}
 */
const AuthRouteGuard = ({ children }) => {
    // ... (logic) ...
    const user = localStorage.getItem('user');
    const tokens = localStorage.getItem('tokens');
    
    // JSX sözdizimi buradadır: <Navigate ... />
    if (user || tokens) {
        // Hatanın kaynağı buradaki '<' karakteri olabilir
        return <Navigate to="/" replace />; 
    }

    return children ? children : <Outlet />;
};

export const GuestRoute = AuthRouteGuard;
// ... (Diğer export'lar)