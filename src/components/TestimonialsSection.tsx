import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    prize: '50% OFF',
    text: "I couldn't believe it when I won 50% off! Best shopping experience ever!",
    avatar: 'S',
    date: '2 hours ago',
  },
  {
    name: 'Mike T.',
    prize: 'FREE SHIPPING',
    text: 'Spun the wheel just for fun and got free shipping on my entire order!',
    avatar: 'M',
    date: '5 hours ago',
  },
  {
    name: 'Emma L.',
    prize: '20% OFF',
    text: 'Love this! Already planning to come back tomorrow for another spin.',
    avatar: 'E',
    date: '1 day ago',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            REAL WINNERS, REAL PRIZES
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our lucky spinners are saying
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card border border-border rounded-xl p-6 relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-fire flex items-center justify-center text-lg font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4">{testimonial.text}</p>

              <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-sm font-semibold text-primary">
                Won: {testimonial.prize}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
