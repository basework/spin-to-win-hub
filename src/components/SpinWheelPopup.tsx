import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import SpinWheel from './SpinWheel';
import EmailCaptureForm from './EmailCaptureForm';
import PrizeReveal from './PrizeReveal';
import { Prize, getPrizes, saveLead } from '@/lib/prizeStore';

type PopupState = 'email' | 'spin' | 'reveal';

interface SpinWheelPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpinWheelPopup = ({ open, onOpenChange }: SpinWheelPopupProps) => {
  const [state, setState] = useState<PopupState>('email');
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState<string | undefined>();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPrizes(getPrizes());
  }, [open]);

  const handleEmailSubmit = (email: string, phone?: string) => {
    setIsLoading(true);
    setUserEmail(email);
    setUserPhone(phone);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsLoading(false);
      setState('spin');
    }, 500);
  };

  const handleSpinEnd = (prize: Prize) => {
    setWonPrize(prize);
    
    // Save the lead
    saveLead({
      email: userEmail,
      phone: userPhone,
      prize: prize.label,
      prizeCode: prize.code,
    });
    
    setTimeout(() => {
      setState('reveal');
    }, 500);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after close animation
    setTimeout(() => {
      setState('email');
      setWonPrize(null);
      setUserEmail('');
      setUserPhone(undefined);
      setIsSpinning(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] bg-card border-border p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="h-2 bg-gradient-fire" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-6">
          {state === 'email' && (
            <EmailCaptureForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
          )}

          {state === 'spin' && (
            <div className="text-center">
              <h2 className="text-2xl font-display text-foreground mb-2">
                SPIN TO WIN!
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Click the wheel to spin and reveal your prize
              </p>
              <div className="flex justify-center">
                <SpinWheel
                  prizes={prizes}
                  onSpinEnd={handleSpinEnd}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
              </div>
              {!isSpinning && (
                <p className="text-primary text-sm mt-4 animate-bounce-subtle">
                  👆 Tap the wheel to spin!
                </p>
              )}
            </div>
          )}

          {state === 'reveal' && wonPrize && (
            <PrizeReveal prize={wonPrize} onClose={handleClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpinWheelPopup;
