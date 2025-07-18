import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import PromptGenerator from '@/components/PromptGenerator';
import PromptHistory from '@/components/PromptHistory';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'generator' | 'history'>('generator');
  const [apiKey, setApiKey] = useState('');

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

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-background">
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
