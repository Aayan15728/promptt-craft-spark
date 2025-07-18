import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Heart, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface Prompt {
  id: string;
  goal: string;
  generated_prompt: string;
  category: string | null;
  is_favorite: boolean;
  created_at: string;
}

interface PromptHistoryProps {
  user: User;
}

const PromptHistory = ({ user }: PromptHistoryProps) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompts();
  }, [user]);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast({
        title: "Error",
        description: "Failed to load prompt history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .update({ is_favorite: !currentFavorite })
        .eq('id', id);

      if (error) throw error;
      
      setPrompts(prompts.map(p => 
        p.id === id ? { ...p, is_favorite: !currentFavorite } : p
      ));
      
      toast({
        title: currentFavorite ? "Removed from favorites" : "Added to favorites",
        description: "Prompt updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive"
      });
    }
  };

  const deletePrompt = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPrompts(prompts.filter(p => p.id !== id));
      
      toast({
        title: "Deleted",
        description: "Prompt deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete prompt",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (prompts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Prompt History</CardTitle>
          <CardDescription>
            Your generated prompts will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No prompts generated yet. Create your first prompt to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Prompt History</h2>
      {prompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">{prompt.goal}</CardTitle>
                <div className="flex items-center gap-2">
                  {prompt.category && (
                    <Badge variant="secondary">{prompt.category}</Badge>
                  )}
                  {prompt.is_favorite && (
                    <Badge variant="outline">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      Favorite
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {new Date(prompt.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(prompt.generated_prompt)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavorite(prompt.id, prompt.is_favorite)}
                >
                  <Heart className={`h-4 w-4 ${prompt.is_favorite ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePrompt(prompt.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <p className="whitespace-pre-wrap text-sm">{prompt.generated_prompt}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromptHistory;