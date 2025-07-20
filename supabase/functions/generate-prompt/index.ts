import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal, category, apiKey } = await req.json();
    
    // Get API key from environment or use provided one
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || apiKey;

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key is required. Please provide your OpenRouter API key or configure it in the environment.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = createSystemPrompt(goal, category);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://promptt.ai',
        'X-Title': 'Promptt AI Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert prompt engineer. Generate highly effective, detailed prompts for GPT models based on user goals. Return only the optimized prompt, nothing else.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(
        JSON.stringify({ error: error.error?.message || 'Failed to generate prompt' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedPrompt = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ generatedPrompt }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-prompt function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function createSystemPrompt(goal: string, category?: string): string {
  const categoryContext = category ? ` for ${category}` : '';
  
  return `Create an optimized GPT prompt for this goal: "${goal}"${categoryContext}

Please generate a prompt that:
1. Is specific and detailed
2. Includes relevant context and constraints
3. Specifies the desired output format
4. Uses clear, actionable language
5. Incorporates best practices for prompt engineering

Consider the user's goal and create a prompt that will generate the highest quality results from a language model.`;
}