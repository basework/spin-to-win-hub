import { Button } from '@/components/ui/button';
import { Gift, Star, ShieldCheck, Truck } from 'lucide-react';

interface HeroProps {
  onOpenWheel: () => void;
}

const Hero = ({ onOpenWheel }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8 animate-fade-in">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-semibold text-primary">LIMITED TIME OFFER</span>
          <Star className="w-4 h-4 text-primary fill-primary" />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-none mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">SPIN TO WIN</span>
          <br />
          <span className="text-gradient-gold">EXCLUSIVE PRIZES!</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Join <span className="text-primary font-semibold">10,000+</span> lucky winners! 
          Spin the wheel for discounts up to <span className="text-secondary font-semibold">50% OFF</span>
        </p>

        {/* CTA Button */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button
            size="lg"
            onClick={onOpenWheel}
            className="h-16 px-12 text-xl font-bold bg-gradient-fire hover:opacity-90 animate-pulse-glow glow-gold text-primary-foreground rounded-full"
          >
            <Gift className="w-6 h-6 mr-3" />
            SPIN NOW & WIN BIG!
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            No purchase necessary • Instant prizes
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span className="text-sm">Secure & Safe</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-5 h-5 text-primary" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-sm">4.9/5 Rating</span>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">1,247</span> people won prizes today!
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
