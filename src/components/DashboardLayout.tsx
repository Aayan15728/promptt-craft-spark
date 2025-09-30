import React from 'react';
import Navigation from './Navigation';
import { User } from '@supabase/supabase-js';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User | null;
  dailyUsesLeft: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user, dailyUsesLeft }) => {
  if (!user) {
    // This should ideally not be reached if routing is correct
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation
        userEmail={user.email || ''}
        dailyUsesLeft={dailyUsesLeft}
      />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;