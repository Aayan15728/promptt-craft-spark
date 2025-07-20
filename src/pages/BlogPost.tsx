import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const blogPosts = {
  'ai-prompt-engineering-guide': {
    title: 'The Ultimate Guide to AI Prompt Engineering',
    author: 'AI Expert',
    date: '2024-01-15',
    readTime: '8 min read',
    content: `
      <h2>What is Prompt Engineering?</h2>
      <p>Prompt engineering is the art and science of crafting effective inputs for AI language models to generate desired outputs. It's become a crucial skill in the AI era.</p>
      
      <h3>Why Prompt Engineering Matters</h3>
      <p>Good prompts can mean the difference between mediocre and exceptional AI outputs. Here's why it matters:</p>
      <ul>
        <li><strong>Precision:</strong> Well-crafted prompts reduce ambiguity</li>
        <li><strong>Efficiency:</strong> Save time by getting better results faster</li>
        <li><strong>Consistency:</strong> Reliable outputs for similar inputs</li>
      </ul>
      
      <h3>Best Practices for Effective Prompts</h3>
      <ol>
        <li><strong>Be Specific:</strong> Include context, constraints, and desired format</li>
        <li><strong>Use Examples:</strong> Show the AI what you want with sample outputs</li>
        <li><strong>Set the Role:</strong> Tell the AI what role to play (expert, teacher, etc.)</li>
        <li><strong>Break Down Complex Tasks:</strong> Divide large requests into smaller parts</li>
      </ol>
      
      <h3>Advanced Techniques</h3>
      <p>For power users, consider these advanced strategies:</p>
      <ul>
        <li><strong>Chain of Thought:</strong> Ask the AI to show its reasoning</li>
        <li><strong>Temperature Control:</strong> Adjust creativity vs. consistency</li>
        <li><strong>System Messages:</strong> Set persistent behavior guidelines</li>
      </ul>
    `
  },
  'chatgpt-vs-claude-comparison': {
    title: 'ChatGPT vs Claude: A Comprehensive Comparison',
    author: 'Tech Analyst',
    date: '2024-01-12',
    readTime: '6 min read',
    content: `
      <h2>The AI Assistant Landscape</h2>
      <p>Two giants dominate the AI assistant space: OpenAI's ChatGPT and Anthropic's Claude. Let's dive into their strengths and differences.</p>
      
      <h3>ChatGPT Strengths</h3>
      <ul>
        <li><strong>Versatility:</strong> Excellent across many domains</li>
        <li><strong>Code Generation:</strong> Strong programming capabilities</li>
        <li><strong>Plugin Ecosystem:</strong> Extensive third-party integrations</li>
        <li><strong>Multimodal:</strong> Can process images and text</li>
      </ul>
      
      <h3>Claude Advantages</h3>
      <ul>
        <li><strong>Safety Focus:</strong> More careful about harmful content</li>
        <li><strong>Context Length:</strong> Can handle very long documents</li>
        <li><strong>Nuanced Understanding:</strong> Better at subtle language nuances</li>
        <li><strong>Constitutional AI:</strong> Built with ethical principles</li>
      </ul>
      
      <h3>Use Case Recommendations</h3>
      <p><strong>Choose ChatGPT for:</strong></p>
      <ul>
        <li>General productivity tasks</li>
        <li>Creative writing projects</li>
        <li>Code development and debugging</li>
        <li>Image analysis and generation</li>
      </ul>
      
      <p><strong>Choose Claude for:</strong></p>
      <ul>
        <li>Long document analysis</li>
        <li>Sensitive content review</li>
        <li>Academic research assistance</li>
        <li>Complex reasoning tasks</li>
      </ul>
    `
  },
  'future-of-ai-content-creation': {
    title: 'The Future of AI in Content Creation',
    author: 'Content Strategist',
    date: '2024-01-10',
    readTime: '7 min read',
    content: `
      <h2>AI is Transforming Content Creation</h2>
      <p>The content creation landscape is evolving rapidly with AI tools becoming more sophisticated and accessible.</p>
      
      <h3>Current AI Content Tools</h3>
      <ul>
        <li><strong>Text Generation:</strong> ChatGPT, Claude, Jasper</li>
        <li><strong>Image Creation:</strong> DALL-E, Midjourney, Stable Diffusion</li>
        <li><strong>Video Production:</strong> Runway, Synthesia, Pictory</li>
        <li><strong>Audio/Music:</strong> ElevenLabs, Mubert, AIVA</li>
      </ul>
      
      <h3>Benefits for Creators</h3>
      <ol>
        <li><strong>Speed:</strong> Generate content in minutes, not hours</li>
        <li><strong>Ideation:</strong> Overcome creative blocks with AI brainstorming</li>
        <li><strong>Personalization:</strong> Create tailored content at scale</li>
        <li><strong>Cost Efficiency:</strong> Reduce production costs significantly</li>
      </ol>
      
      <h3>Challenges and Considerations</h3>
      <p>While AI offers amazing opportunities, creators should be aware of:</p>
      <ul>
        <li><strong>Quality Control:</strong> AI output still needs human review</li>
        <li><strong>Originality:</strong> Ensuring unique voice and perspective</li>
        <li><strong>Ethics:</strong> Proper attribution and transparency</li>
        <li><strong>Platform Policies:</strong> Understanding AI content guidelines</li>
      </ul>
      
      <h3>The Future Outlook</h3>
      <p>Looking ahead, we expect to see:</p>
      <ul>
        <li>More seamless human-AI collaboration</li>
        <li>Better quality control and fact-checking</li>
        <li>Specialized AI tools for niche content types</li>
        <li>Integration with existing creative workflows</li>
      </ul>
    `
  }
};

const AdSlot: React.FC<{ position: string }> = ({ position }) => (
  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center my-8">
    <div className="text-muted-foreground text-sm mb-2">Advertisement</div>
    <div className="bg-white/80 dark:bg-gray-900/80 rounded p-4 border">
      <div className="text-lg font-medium text-muted-foreground">Ad Space - {position}</div>
      <div className="text-sm text-muted-foreground mt-1">728x90 Banner</div>
    </div>
  </div>
);

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-block mb-6">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Top Ad Slot */}
        <AdSlot position="Header" />

        {/* Article */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {post.title}
            </CardTitle>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Middle Ad Slot */}
            <AdSlot position="Middle" />
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Try Our AI Prompt Generator</h3>
              <p className="text-muted-foreground mb-4">
                Ready to create your own optimized prompts? Our AI-powered tool helps you craft perfect prompts for any use case.
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Generate Prompts Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad Slot */}
        <AdSlot position="Footer" />
      </div>
    </div>
  );
};

export default BlogPost;