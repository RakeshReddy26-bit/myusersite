import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff' | 'user';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = window.location.pathname;

  // Debug logs
  console.log('[ProtectedRoute] user:', user);
  console.log('[ProtectedRoute] loading:', loading);
  console.log('[ProtectedRoute] location:', location);
  console.log('[ProtectedRoute] requiredRole:', requiredRole);

  if (loading) return null;
  if (!user) {
    console.log('[ProtectedRoute] Redirecting to /login because user is null');
    return <Navigate to="/login" replace />;
  }
  // Restrict /tasks to admin/staff only
  if (location === '/tasks' && user.role !== 'admin' && user.role !== 'staff') {
    console.log('[ProtectedRoute] Redirecting to /my-orders because user is not admin/staff');
    return <Navigate to="/my-orders" replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    console.log('[ProtectedRoute] Redirecting to / because user does not have requiredRole');
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}; 