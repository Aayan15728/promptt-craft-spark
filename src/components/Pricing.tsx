import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Zap, Star, Rocket } from 'lucide-react';

interface PricingProps {
  onGetStarted: () => void;
}

const Pricing = ({ onGetStarted }: PricingProps) => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      icon: Zap,
      popular: false,
      features: [
        { name: "5 prompts per day", included: true },
        { name: "Basic prompt categories", included: true },
        { name: "Prompt history", included: true },
        { name: "Copy to clipboard", included: true },
        { name: "Priority support", included: false },
        { name: "Advanced templates", included: false },
        { name: "API access", included: false },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Current Plan",
      buttonAction: () => {},
      disabled: true
    },
    {
      name: "Basic",
      price: "$5",
      period: "/month",
      description: "For regular users",
      icon: Star,
      popular: true,
      features: [
        { name: "100 prompts per month", included: true },
        { name: "All prompt categories", included: true },
        { name: "Unlimited history", included: true },
        { name: "Favorite prompts", included: true },
        { name: "Email support", included: true },
        { name: "Advanced templates", included: false },
        { name: "API access", included: false },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Get Basic",
      buttonAction: () => window.open('/not-available', '_blank'),
      disabled: false
    },
    {
      name: "Plus",
      price: "$10",
      period: "/month",
      description: "For power users",
      icon: Crown,
      popular: false,
      features: [
        { name: "250 prompts per month", included: true },
        { name: "All prompt categories", included: true },
        { name: "Unlimited history", included: true },
        { name: "Advanced templates", included: true },
        { name: "Priority support", included: true },
        { name: "Export functionality", included: true },
        { name: "API access", included: false },
        { name: "Team collaboration", included: false }
      ],
      buttonText: "Get Plus",
      buttonAction: () => window.open('/not-available', '_blank'),
      disabled: false
    },
    {
      name: "Pro",
      price: "$25",
      period: "/month",
      description: "For professionals & teams",
      icon: Rocket,
      popular: false,
      features: [
        { name: "Unlimited prompts", included: true },
        { name: "All prompt categories", included: true },
        { name: "Unlimited history", included: true },
        { name: "Advanced templates", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Team collaboration", included: true },
        { name: "Custom integrations", included: true }
      ],
      buttonText: "Get Pro",
      buttonAction: () => window.open('/not-available', '_blank'),
      disabled: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of AI prompt generation with our flexible pricing plans
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
              plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                Most Popular
              </div>
            )}
            
            <div className={`${plan.popular ? 'pt-10' : ''}`}>
              <CardHeader className="text-center">
                <div className="mb-4">
                  <div className={`p-3 rounded-lg w-fit mx-auto ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-500/10 to-purple-600/10'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-blue-500'}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                      : plan.disabled 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }`}
                  disabled={plan.disabled}
                  onClick={plan.disabled ? undefined : plan.buttonAction}
                >
                  {plan.buttonText}
                </Button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Why Upgrade?</CardTitle>
          <CardDescription className="text-center">
            Unlock powerful features to supercharge your AI prompt generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 w-fit mx-auto">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold">More Prompts</h3>
              <p className="text-sm text-muted-foreground">
                Generate more prompts monthly with higher tier plans
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 w-fit mx-auto">
                <Crown className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold">Premium Features</h3>
              <p className="text-sm text-muted-foreground">
                Access advanced templates and priority support
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 w-fit mx-auto">
                <Rocket className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Share prompts and collaborate with your team
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What happens to my prompts if I downgrade?</h4>
              <p className="text-sm text-muted-foreground">
                Your prompt history is always preserved. You'll just have different monthly limits going forward.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;