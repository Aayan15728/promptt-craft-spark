import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import PromptGenerator from '@/components/PromptGenerator';
import PromptHistory from '@/components/PromptHistory';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'generator' | 'history'>('generator');
  const [apiKey, setApiKey] = useState('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');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  if (!user && showAuth) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation 
        userEmail={user.email || ''} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="container mx-auto px-4 py-8">
        {currentView === 'generator' ? (
          <PromptGenerator 
            user={user} 
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
        ) : (
          <PromptHistory user={user} />
        )}
      </div>
    </div>
  );
};

export default Index;
