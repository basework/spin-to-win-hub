import { Gift, Zap, Shield, Clock, Star, Heart } from 'lucide-react';

const features = [
  {
    icon: Gift,
    title: 'INSTANT PRIZES',
    description: 'Win discounts, free shipping, and exclusive offers immediately!',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: 'DAILY SPINS',
    description: 'Come back every day for new chances to win big prizes!',
    color: 'text-secondary',
  },
  {
    icon: Shield,
    title: '100% LEGIT',
    description: 'Real prizes, real winners. No catch, no hidden fees.',
    color: 'text-success',
  },
  {
    icon: Clock,
    title: 'LIMITED TIME',
    description: 'Special bonus prizes available for the next 24 hours only!',
    color: 'text-urgent',
  },
  {
    icon: Star,
    title: 'VIP REWARDS',
    description: 'Exclusive prizes for our email subscribers only.',
    color: 'text-gold',
  },
  {
    icon: Heart,
    title: 'LOVED BY ALL',
    description: 'Join thousands of happy winners who saved big!',
    color: 'text-electric',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            WHY SPIN WITH US?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of happy customers win prizes every single day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
