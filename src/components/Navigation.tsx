import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Zap, BookOpen, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  userEmail: string;
  dailyUsesLeft?: number;
}

const Navigation = ({ userEmail, dailyUsesLeft }: NavigationProps) => {
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const getButtonClass = (path: string) => {
    return location.pathname === path
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
      : '';
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">promptt</h1>
            </Link>
            <div className="flex gap-2">
              <Button asChild variant={location.pathname === '/' ? 'default' : 'ghost'} className={getButtonClass('/')}>
                <Link to="/">Generator</Link>
              </Button>
              <Button asChild variant={location.pathname === '/history' ? 'default' : 'ghost'} className={getButtonClass('/history')}>
                <Link to="/history">History</Link>
              </Button>
              <Button asChild variant={location.pathname === '/blog' ? 'default' : 'ghost'} className={getButtonClass('/blog')}>
                <Link to="/blog"><BookOpen className="h-4 w-4 mr-1" />Blog</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              <Link to="/pricing"><Crown className="h-3 w-3 mr-1" />Upgrade</Link>
            </Button>
            <div className="relative">
              <Link to="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-muted/50 px-3 py-2 rounded-lg">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <span className="text-white text-xs font-bold">{userEmail[0].toUpperCase()}</span>
                </div>
                {userEmail.split('@')[0]}
              </Link>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;