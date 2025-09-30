import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Heart, Loader2, Sparkles, CheckCircle, Crown, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Skeleton } from '@/components/ui/skeleton';

interface PromptGeneratorProps {
  user: User | null;
  dailyUsesLeft?: number;
  onUseDailyLimit?: () => void;
  onUpgradeRequired?: () => void;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({ 
  user, 
  dailyUsesLeft = 5, 
  onUseDailyLimit, 
  onUpgradeRequired 
}) => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [promptId, setPromptId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) {
      toast({
        title: "Error",
        description: "Please enter a goal for your prompt",
        variant: "destructive"
      });
      return;
    }

    if (user && dailyUsesLeft <= 0) {
      onUpgradeRequired?.();
      return;
    }

    setLoading(true);
    setGeneratedPrompt('');
    setPromptId(null);
    setIsFavorite(false);

    try {
      const { data, error } = await supabase.functions.invoke('generate-prompt', {
        body: { goal, category: category || undefined },
      });

      if (error) throw new Error(error.message || 'Failed to call prompt generation function');
      if (data?.error) throw new Error(data.error);
      if (!data?.generatedPrompt) throw new Error('No prompt was generated. Please try again.');

      setGeneratedPrompt(data.generatedPrompt);
      
      if (user) {
        onUseDailyLimit?.();
        const newPromptId = await savePrompt(data.generatedPrompt);
        setPromptId(newPromptId);
      }
      
      toast({
        title: "Success",
        description: user 
          ? `Prompt generated! ${dailyUsesLeft - 1} prompts left today.`
          : "Prompt generated! Sign up to save prompts and get more daily uses!"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate prompt. Please try again.";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async (prompt: string): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert({
          user_id: user.id,
          goal,
          generated_prompt: prompt,
          category: category || null,
          is_favorite: false,
        })
        .select('id')
        .single();

      if (error) throw error;
      return data?.id || null;
    } catch (error) {
      console.error('Error saving prompt:', error);
      return null;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard" });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleFavorite = async () => {
    if (!promptId || !user) {
      toast({ title: "Note", description: "Save prompts by signing up!"});
      return;
    };

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    try {
      const { error } = await supabase
        .from('prompts')
        .update({ is_favorite: newFavoriteStatus })
        .eq('id', promptId)
        .eq('user_id', user.id);

      if (error) {
        setIsFavorite(!newFavoriteStatus); // Revert on error
        throw error;
      }

      toast({
        title: newFavoriteStatus ? "Saved to Favorites" : "Removed from Favorites",
        description: "You can find your favorite prompts in the History page.",
      });
    } catch (error) {
      toast({ title: "Error", description: "Could not update favorite status.", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">AI Prompt Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your ideas into optimized prompts that get better results from AI models
        </p>
        {user && (
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 px-4 py-2 rounded-full border">
              <span className="font-medium">Daily Prompts: </span>
              <span className="gradient-text font-bold">{dailyUsesLeft} remaining</span>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 px-4 py-2 rounded-full border">
              <span className="font-medium">Plan: </span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Generator */}
      <Card className="gradient-border shadow-2xl">
        <div>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-fit">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl gradient-text">Create Your Prompt</CardTitle>
            <CardDescription className="text-base">
              Describe what you want to achieve and we'll craft the perfect AI prompt
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-base font-semibold">What's your goal? *</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Write a compelling product description for my new app, Create a social media strategy, Generate code for a login form..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-muted/50 min-h-[120px] resize-none border-2 transition-colors focus:border-blue-500"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-semibold">Category (Optional)</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-muted/50 border-2 transition-colors focus:border-blue-500">
                      <SelectValue placeholder="Choose a category to enhance your prompt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="writing">✍️ Writing & Content Creation</SelectItem>
                      <SelectItem value="marketing">📈 Marketing & Advertising</SelectItem>
                      <SelectItem value="coding">💻 Programming & Development</SelectItem>
                      <SelectItem value="analysis">📊 Data Analysis & Research</SelectItem>
                      <SelectItem value="creative">🎨 Creative & Design</SelectItem>
                      <SelectItem value="business">💼 Business & Strategy</SelectItem>
                      <SelectItem value="education">🎓 Education & Training</SelectItem>
                      <SelectItem value="social">📱 Social Media & Content</SelectItem>
                      <SelectItem value="finance">💰 Finance & Investment</SelectItem>
                      <SelectItem value="health">🏥 Healthcare & Wellness</SelectItem>
                      <SelectItem value="travel">✈️ Travel & Tourism</SelectItem>
                      <SelectItem value="entertainment">🎬 Entertainment & Media</SelectItem>
                      <SelectItem value="technology">⚡ Technology & Innovation</SelectItem>
                      <SelectItem value="science">🧪 Science & Research</SelectItem>
                      <SelectItem value="legal">⚖️ Legal & Compliance</SelectItem>
                      <SelectItem value="sales">🎯 Sales & Customer Relations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-to-r from-blue-500/5 to-purple-600/5 p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-sm mb-2 text-blue-600">💡 Pro Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific about your desired outcome</li>
                    <li>• Include context about your audience</li>
                    <li>• Mention tone and style preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !goal.trim() || (user && dailyUsesLeft <= 0)}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
              {user && dailyUsesLeft <= 0 ? (
                <>
                  <Crown className="mr-2 h-5 w-5" />
                  Upgrade for More Prompts
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Perfect Prompt
                </>
              )}
              {user && dailyUsesLeft > 0 && (
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                  {dailyUsesLeft} left today
                </span>
              )}
            </Button>
          </CardContent>
        </div>
      </Card>

      {/* Generated Result */}
      {loading && (
        <Card className="shadow-xl">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
        </Card>
      )}

      {generatedPrompt && !loading && (
        <Card className="shadow-xl border-2 border-green-500/20 bg-gradient-to-r from-green-500/5 to-emerald-600/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-green-600">Your Optimized Prompt</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="hover:bg-green-500/10 hover:border-green-500/50"
                >
                  {isCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                  className={`hover:bg-red-500/10 hover:border-red-500/50 ${isFavorite ? 'text-red-500 border-red-500/50' : ''}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg border-2 border-dashed border-green-500/30">
              <Textarea
                value={generatedPrompt}
                readOnly
                className="min-h-[200px] resize-none border-0 bg-transparent text-base leading-relaxed focus:ring-0"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>✅ Optimized for AI models</span>
              <span>✅ Ready to use</span>
              <span>✅ {generatedPrompt.length} characters</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptGenerator;