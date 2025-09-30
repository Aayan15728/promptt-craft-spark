import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah L.",
    title: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial: "Promptt has revolutionized our content creation process. We're generating high-quality AI prompts in a fraction of the time. It's an indispensable tool for our team.",
  },
  {
    name: "David C.",
    title: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    testimonial: "As a developer, I'm constantly using AI for coding assistance. Promptt helps me craft the perfect prompts to get the exact code snippets I need. It's a huge time-saver.",
  },
  {
    name: "Emily R.",
    title: "Freelance Writer",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    testimonial: "I was skeptical at first, but Promptt has become my secret weapon for overcoming writer's block. The creative prompts it generates are simply amazing.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who are getting better results with Promptt
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="mb-6">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;