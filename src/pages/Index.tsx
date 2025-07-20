import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import PromptGenerator from '@/components/PromptGenerator';
import PromptHistory from '@/components/PromptHistory';
import LandingPage from '@/components/LandingPage';
import BlogSection from '@/components/BlogSection';
import Profile from '@/components/Profile';
import Pricing from '@/components/Pricing';
import NotAvailable from '@/components/NotAvailable';

const Index = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'generator' | 'history' | 'blog' | 'profile' | 'pricing' | 'not-available'>('generator');
  const [apiKey, setApiKey] = useState('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');
  const [showAuth, setShowAuth] = useState(false);
  const [freeUsesLeft, setFreeUsesLeft] = useState(5);
  const [dailyUsesLeft, setDailyUsesLeft] = useState(5);

  // Handle URL-based routing
  useEffect(() => {
    if (location.pathname === '/not-available') {
      setCurrentView('not-available');
    }
  }, [location.pathname]);

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
    return <LandingPage 
      onGetStarted={() => setShowAuth(true)} 
      onViewBlog={() => setCurrentView('blog')}
      onViewPricing={() => setCurrentView('pricing')}
    />;
  }

  if (!user && showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

  // Handle non-authenticated blog and pricing views
  if (!user && (currentView === 'blog' || currentView === 'pricing' || currentView === 'not-available')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" onClick={() => setCurrentView('generator')}>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer">
                  <span className="text-white font-bold">P</span>
                </div>
                <h1 className="text-2xl font-bold gradient-text cursor-pointer">promptt</h1>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setCurrentView('blog')} className="text-muted-foreground hover:text-foreground transition-colors">Blog</button>
                <button onClick={() => setCurrentView('pricing')} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
                <button onClick={() => setShowAuth(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg">Get Started</button>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          {currentView === 'blog' ? (
            <BlogSection />
          ) : currentView === 'pricing' ? (
            <Pricing onGetStarted={() => setShowAuth(true)} />
          ) : currentView === 'not-available' ? (
            <NotAvailable />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation 
        userEmail={user.email || ''} 
        currentView={currentView}
        setCurrentView={setCurrentView}
        dailyUsesLeft={dailyUsesLeft}
      />
      <div className="container mx-auto px-4 py-8">
        {currentView === 'generator' ? (
          <PromptGenerator 
            user={user} 
            apiKey={apiKey}
            setApiKey={setApiKey}
            dailyUsesLeft={dailyUsesLeft}
            onUseDailyLimit={() => setDailyUsesLeft(prev => Math.max(0, prev - 1))}
            onUpgradeRequired={() => setCurrentView('pricing')}
          />
        ) : currentView === 'history' ? (
          <PromptHistory user={user} />
        ) : currentView === 'blog' ? (
          <BlogSection />
        ) : currentView === 'profile' ? (
          <Profile user={user} setCurrentView={setCurrentView} />
        ) : currentView === 'pricing' ? (
          <Pricing onGetStarted={() => setShowAuth(true)} />
        ) : currentView === 'not-available' ? (
          <NotAvailable />
        ) : (
          <LandingPage 
            onGetStarted={() => setShowAuth(true)} 
            onViewBlog={() => setCurrentView('blog')}
            onViewPricing={() => setCurrentView('pricing')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
