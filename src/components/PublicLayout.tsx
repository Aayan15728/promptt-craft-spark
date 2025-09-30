import React from 'react';
import PublicHeader from './PublicHeader';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <PublicHeader />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;