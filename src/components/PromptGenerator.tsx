import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface PromptGeneratorProps {
  user: User;
  apiKey: string;
  setApiKey: (key: string) => void;
}

const PromptGenerator = ({ user, apiKey, setApiKey }: PromptGeneratorProps) => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!goal.trim()) {
      toast({
        title: "Error",
        description: "Please enter a goal for your prompt",
        variant: "destructive"
      });
      return;
    }


    setLoading(true);

    try {
      const { data } = await supabase.functions.invoke('generate-prompt', {
        body: {
          goal,
          category: category || undefined,
          apiKey
        },
      });

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPrompt(data.generatedPrompt);
      
      // Save to database
      await savePrompt(data.generatedPrompt);
      
      toast({
        title: "Success",
        description: "Prompt generated successfully!"
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate prompt",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async (prompt: string) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .insert({
          user_id: user.id,
          goal,
          generated_prompt: prompt,
          category: category || null
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
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

  const toggleFavorite = async () => {
    // This would require finding the prompt ID and updating it
    toast({
      title: "Feature coming soon",
      description: "Favorites will be available in the next update"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-border">
        <div>
          <CardHeader>
            <CardTitle className="gradient-text">Generate AI Prompt</CardTitle>
            <CardDescription>
              Describe what you want to achieve and we'll create an optimized prompt for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                placeholder="e.g., write a tweet about productivity"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No category</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !goal.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Prompt
            </Button>
          </CardContent>
        </div>
      </Card>

      {generatedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Prompt
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedPrompt}
              readOnly
              className="min-h-[200px] resize-none"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptGenerator;