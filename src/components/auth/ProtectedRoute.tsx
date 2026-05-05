import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { state } = useAppStore();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = state.user || JSON.parse(localStorage.getItem('user') || 'null');

  // console.log(`ProtectedRoute: ${location.pathname} [isLoggedIn: ${isLoggedIn}, role: ${user?.role}]`);

  if (!isLoggedIn || !user) {
    // console.log('Redirecting to /auth: User not logged in or missing');
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // console.log(`Access Denied: Role ${user.role} not in ${allowedRoles}`);
    // Redirect to their respective home if they try to access unauthorized dashboard
    const role = user.role.toUpperCase();
    let redirectPath = '/customer';
    if (role === 'SUPER_ADMIN') redirectPath = '/super-admin';
    else if (role === 'ADMIN') redirectPath = '/admin';
    else if (role === 'AGENT') redirectPath = '/agent';
    else if (role === 'CSR') redirectPath = '/csr';
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
