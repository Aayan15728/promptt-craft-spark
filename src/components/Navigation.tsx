import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Zap, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NavigationProps {
  userEmail: string;
  currentView: 'generator' | 'history' | 'blog';
  setCurrentView: (view: 'generator' | 'history' | 'blog') => void;
}

const Navigation = ({ userEmail, currentView, setCurrentView }: NavigationProps) => {
  const { toast } = useToast();

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

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">promptt</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'generator' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('generator')}
                className={currentView === 'generator' ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''}
              >
                Generator
              </Button>
              <Button
                variant={currentView === 'history' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('history')}
                className={currentView === 'history' ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''}
              >
                History
              </Button>
              <Button
                variant={currentView === 'blog' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('blog')}
                className={currentView === 'blog' ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Blog
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
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