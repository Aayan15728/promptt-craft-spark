import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, History, FileText, CreditCard, Crown, Settings, LogOut } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: SupabaseUser;
}

const Profile = ({ user }: ProfileProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const profileSections = [
    {
      icon: History,
      title: "Prompt History",
      description: "View all your generated prompts",
      action: () => navigate('/history'),
      badge: "View All"
    },
    {
      icon: FileText,
      title: "My Prompts",
      description: "Manage your saved prompts",
      action: () => navigate('/history'),
      badge: "Manage"
    },
    {
      icon: CreditCard,
      title: "Subscription Plans",
      description: "Upgrade your account",
      action: () => navigate('/pricing'),
      badge: "Free Plan"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="gradient-border">
        <div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl gradient-text">Welcome back!</CardTitle>
                  <CardDescription className="text-lg">{user.email}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-sm text-muted-foreground">Current Plan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5</div>
                <div className="text-sm text-muted-foreground">Daily Prompts Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">∞</div>
                <div className="text-sm text-muted-foreground">History Storage</div>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => setCurrentView('pricing')}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Profile Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {profileSections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={section.action}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                  <section.icon className="h-6 w-6 text-blue-500" />
                </div>
                <Badge variant="secondary">{section.badge}</Badge>
              </div>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0">
                Access Now →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => setCurrentView('generator')}
            >
              <div className="text-left">
                <div className="font-semibold">Generate New Prompt</div>
                <div className="text-sm text-muted-foreground">Create a new AI prompt</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => setCurrentView('history')}
            >
              <div className="text-left">
                <div className="font-semibold">Browse History</div>
                <div className="text-sm text-muted-foreground">View past prompts</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;