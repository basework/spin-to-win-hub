import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Prize } from '@/lib/prizeStore';
import { Copy, Check, Gift, PartyPopper } from 'lucide-react';

interface PrizeRevealProps {
  prize: Prize;
  onClose: () => void;
}

const PrizeReveal = ({ prize, onClose }: PrizeRevealProps) => {
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  const isWin = prize.code !== '';

  useEffect(() => {
    if (isWin) {
      const colors = ['hsl(38 100% 50%)', 'hsl(0 85% 55%)', 'hsl(280 80% 55%)', 'hsl(145 70% 45%)'];
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfetti(newConfetti);
    }
  }, [isWin]);

  const handleCopy = async () => {
    if (prize.code) {
      await navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative text-center py-6 overflow-hidden">
      {/* Confetti */}
      {isWin && confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${c.left}%`,
            top: '-10px',
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      {isWin ? (
        <>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <PartyPopper className="w-16 h-16 text-primary animate-bounce-subtle" />
              <div className="absolute inset-0 animate-ping">
                <PartyPopper className="w-16 h-16 text-primary opacity-30" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display text-gradient-gold mb-2">
            CONGRATULATIONS!
          </h2>
          <p className="text-lg text-foreground mb-6">
            You won an exclusive prize!
          </p>

          <div className="bg-muted rounded-xl p-6 mb-6 border-2 border-primary/50">
            <p className="text-sm text-muted-foreground mb-2">YOUR PRIZE</p>
            <p className="text-3xl font-display text-primary mb-4">
              {prize.label}
            </p>
            
            <div className="flex items-center justify-center gap-2 bg-background rounded-lg p-4">
              <code className="text-2xl font-mono font-bold text-foreground tracking-wider">
                {prize.code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-primary hover:text-primary/80 hover:bg-primary/10"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Use this code at checkout to claim your reward!
            <br />
            <span className="text-secondary font-semibold">Expires in 24 hours!</span>
          </p>
        </>
      ) : (
        <>
          <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-3xl font-display text-foreground mb-2">
            BETTER LUCK NEXT TIME!
          </h2>
          <p className="text-muted-foreground mb-6">
            Don't worry, you can try again tomorrow!
          </p>
        </>
      )}

      <Button
        onClick={onClose}
        className="w-full h-12 bg-gradient-fire hover:opacity-90 text-primary-foreground font-bold"
      >
        CONTINUE SHOPPING
      </Button>
    </div>
  );
};

export default PrizeReveal;
