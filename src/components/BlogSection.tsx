import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to AI Prompt Engineering",
    description: "Discover professional-grade techniques for crafting AI prompts that deliver consistent, high-quality results.",
    category: "Techniques",
    author: "Sarah Johnson",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    tags: ["AI", "Prompt Engineering", "Tips"],
    slug: "ai-prompt-engineering-guide"
  },
  {
    id: 2,
    title: "ChatGPT vs Claude: A Comprehensive Comparison",
    description: "A comprehensive comparison of leading AI models and how to optimize prompts for each platform.",
    category: "Comparison",
    author: "Mike Chen",
    date: "Jan 12, 2025",
    readTime: "8 min read",
    tags: ["AI Models", "Comparison", "OpenAI"],
    slug: "chatgpt-vs-claude-comparison"
  },
  {
    id: 3,
    title: "The Future of AI in Content Creation",
    description: "Understanding how AI models interpret language and how to structure prompts for better responses.",
    category: "Psychology",
    author: "Dr. Emily Rodriguez",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    tags: ["Psychology", "AI Behavior", "Research"],
    slug: "future-of-ai-content-creation"
  },
  {
    id: 4,
    title: "From Zero to Hero: Building Your First AI-Powered Workflow",
    description: "Step-by-step guide to creating automated workflows using AI prompts for maximum productivity.",
    category: "Workflow",
    author: "Alex Thompson",
    date: "Jan 8, 2025",
    readTime: "10 min read",
    tags: ["Automation", "Productivity", "Workflow"]
  },
  {
    id: 5,
    title: "Common Prompt Mistakes That Kill Your AI Results",
    description: "Avoid these critical errors that prevent you from getting the best responses from AI models.",
    category: "Mistakes",
    author: "Lisa Wang",
    date: "Jan 5, 2025",
    readTime: "4 min read",
    tags: ["Mistakes", "Best Practices", "Tips"]
  },
  {
    id: 6,
    title: "Creative Writing with AI: Prompts That Spark Imagination",
    description: "Unlock your creative potential with these powerful prompts designed for writers and content creators.",
    category: "Creative",
    author: "James Miller",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    tags: ["Creative Writing", "Content Creation", "Inspiration"]
  },
  {
    id: 7,
    title: "Business Prompts That Save Hours of Work Every Day",
    description: "Professional prompts for marketing, analysis, reporting, and strategic planning that boost efficiency.",
    category: "Business",
    author: "Rachel Green",
    date: "Dec 30, 2024",
    readTime: "9 min read",
    tags: ["Business", "Efficiency", "Marketing"]
  },
  {
    id: 8,
    title: "The Science of Prompt Temperature and Parameter Tuning",
    description: "Deep dive into AI model parameters and how adjusting them can dramatically improve your results.",
    category: "Technical",
    author: "Dr. David Kim",
    date: "Dec 28, 2024",
    readTime: "12 min read",
    tags: ["Technical", "Parameters", "Advanced"]
  },
  {
    id: 9,
    title: "Multi-Language Prompting: Getting Great Results in Any Language",
    description: "Techniques for creating effective prompts in languages other than English and cross-cultural considerations.",
    category: "International",
    author: "Maria Garcia",
    date: "Dec 25, 2024",
    readTime: "6 min read",
    tags: ["International", "Languages", "Culture"]
  },
  {
    id: 10,
    title: "AI Ethics in Prompt Engineering: Responsible AI Usage",
    description: "Best practices for ethical AI usage, avoiding bias, and creating inclusive prompts.",
    category: "Ethics",
    author: "Dr. John Roberts",
    date: "Dec 22, 2024",
    readTime: "8 min read",
    tags: ["Ethics", "Responsibility", "Bias"]
  },
  {
    id: 11,
    title: "Future of Prompt Engineering: Trends to Watch in 2025",
    description: "Emerging trends, new AI models, and what the future holds for prompt engineering professionals.",
    category: "Future",
    author: "Sofia Patel",
    date: "Dec 20, 2024",
    readTime: "11 min read",
    tags: ["Future", "Trends", "2025"]
  },
  {
    id: 12,
    title: "Measuring Success: Analytics for Your AI Prompts",
    description: "How to track, measure, and optimize your prompt performance using data-driven approaches.",
    category: "Analytics",
    author: "Chris Anderson",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    tags: ["Analytics", "Optimization", "Data"]
  }
];

const BlogSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Promptt Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master the art of AI prompt engineering with expert insights, tips, and techniques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Ad Slots */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
        <div className="text-muted-foreground text-sm mb-2">Advertisement</div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded p-4 border">
          <div className="text-lg font-medium text-muted-foreground">Ad Space - Blog Section</div>
          <div className="text-sm text-muted-foreground mt-1">970x250 Leaderboard</div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;