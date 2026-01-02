import { Button } from '@/components/ui/button';
import { Gift, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onOpenWheel: () => void;
}

const CTASection = ({ onOpenWheel }: CTASectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-royal opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC00djJoNHYtMnptMC02aC00djJoNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 backdrop-blur border border-foreground/20 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
          </span>
          <span className="text-sm font-semibold text-foreground">LIMITED SPOTS REMAINING</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-display text-foreground mb-6">
          DON'T MISS OUT!
          <br />
          <span className="text-gold-light">SPIN NOW & WIN BIG</span>
        </h2>

        <p className="text-xl text-foreground/80 max-w-xl mx-auto mb-8">
          Over <span className="font-bold text-gold-light">$50,000</span> in prizes given away this month. 
          Your turn could be next!
        </p>

        <Button
          size="lg"
          onClick={onOpenWheel}
          className="h-16 px-12 text-xl font-bold bg-foreground hover:bg-foreground/90 text-background rounded-full group"
        >
          <Gift className="w-6 h-6 mr-3" />
          CLAIM YOUR PRIZE
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-foreground/60 text-sm mt-6">
          🎁 Over 10,000 prizes claimed today!
        </p>
      </div>
    </section>
  );
};

export default CTASection;
