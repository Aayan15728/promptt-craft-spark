import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Sparkles, 
  Clock, 
  Shield,
  ArrowRight,
  BrainCircuit,
  Rocket,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '@/components/Testimonials';

const LandingPage = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "Intelligent Optimization",
      description: "Our AI analyzes your goal to create a prompt that is detailed, contextual, and effective."
    },
    {
      icon: Rocket,
      title: "Boosted Productivity",
      description: "Stop wasting time on trial-and-error. Get high-quality results from your AI tools, faster."
    },
    {
      icon: Palette,
      title: "For All Creatives",
      description: "Perfect for marketers, developers, writers, and anyone using AI to create."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is yours. We never store your generated prompts or API keys."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Describe Your Goal",
      description: "Tell us what you want to achieve. Be as simple or as detailed as you like."
    },
    {
      step: 2,
      title: "Select a Category",
      description: "Choose a category to help us understand the context of your prompt."
    },
    {
      step: 3,
      title: "Generate & Use",
      description: "Get a perfectly engineered prompt in seconds. Copy and paste it into your favorite AI tool."
    }
  ];

  const blogs = [
    {
      title: "The Ultimate Guide to AI Prompt Engineering",
      description: "Master the art of crafting effective prompts for better AI responses.",
      category: "Guide",
      readTime: "5 min read",
      slug: "ultimate-guide-to-ai-prompt-engineering"
    },
    {
      title: "10 Advanced Prompt Techniques That Actually Work",
      description: "Proven strategies to get better results from ChatGPT and other AI models.",
      category: "Tips",
      readTime: "7 min read",
      slug: "10-advanced-prompt-techniques"
    },
    {
      title: "How to Write Prompts for Creative Writing",
      description: "Unlock your creativity with these specialized prompting techniques.",
      category: "Creative",
      readTime: "4 min read",
      slug: "prompts-for-creative-writing"
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Generate Perfect AI Prompts Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your ideas into optimized prompts that get better results from AI models
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Link to="/auth">
                  Start Generating
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/auth">Try Demo</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Prompts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5s</div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to generate the perfect prompt for your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-2xl mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Promptt?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most advanced AI prompt generator trusted by professionals worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5" />
                <CardHeader className="relative">
                  <div className="mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 w-fit">
                      <feature.icon className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Blog Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Latest Insights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert tips and strategies for mastering AI prompt engineering
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group bg-background">
                <Link to={`/blog/${blog.slug}`} className="block h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{blog.category}</Badge>
                      <span className="text-sm text-muted-foreground">{blog.readTime}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:gradient-text transition-all duration-300">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {blog.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="font-semibold text-blue-500 hover:text-purple-600">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 inline" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Generate Perfect Prompts?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Promptt for their AI prompt generation needs
          </p>
          <Button 
            size="lg" 
            asChild
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
          >
            <Link to="/auth">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">promptt</span>
              </div>
              <p className="text-muted-foreground">
                The future of AI prompt generation is here.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><span className="text-muted-foreground/50 cursor-not-allowed">Tutorials</span></li>
                <li><span className="text-muted-foreground/50 cursor-not-allowed">Templates</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="text-muted-foreground/50 cursor-not-allowed">About</span></li>
                <li><span className="text-muted-foreground/50 cursor-not-allowed">Contact</span></li>
                <li><span className="text-muted-foreground/50 cursor-not-allowed">Privacy</span></li>
                <li><span className="text-muted-foreground/50 cursor-not-allowed">Terms</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Promptt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;