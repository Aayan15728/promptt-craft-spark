import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NavigationProps {
  userEmail: string;
  currentView: 'generator' | 'history';
  setCurrentView: (view: 'generator' | 'history') => void;
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
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">promptt</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'generator' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('generator')}
              >
                Generator
              </Button>
              <Button
                variant={currentView === 'history' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('history')}
              >
                History
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