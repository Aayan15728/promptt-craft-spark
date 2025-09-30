import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from './DashboardLayout';

const ProtectedRoute = () => {
  const { user, loading, dailyUsesLeft } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout user={user} dailyUsesLeft={dailyUsesLeft}>
      <Outlet />
    </DashboardLayout>
  );
};

export default ProtectedRoute;