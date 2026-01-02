import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, Sparkles } from 'lucide-react';

interface EmailCaptureFormProps {
  onSubmit: (email: string, phone?: string) => void;
  isLoading?: boolean;
}

const EmailCaptureForm = ({ onSubmit, isLoading }: EmailCaptureFormProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!consent) {
      setError('Please accept the terms to continue');
      return;
    }

    onSubmit(email.trim(), phone.trim() || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">ALMOST THERE!</span>
        </div>
        <h3 className="text-2xl font-display text-foreground mb-2">
          ENTER YOUR EMAIL TO SPIN
        </h3>
        <p className="text-muted-foreground text-sm">
          Get your exclusive discount code instantly!
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 bg-muted border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Phone number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-11 h-12 bg-muted border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className="mt-0.5 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          I agree to receive promotional emails and accept the{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>

      {error && (
        <p className="text-secondary text-sm text-center animate-shake">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-lg font-bold bg-gradient-fire hover:opacity-90 transition-opacity animate-pulse-glow text-primary-foreground"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'SPIN THE WHEEL NOW!'
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        🔒 Your information is 100% secure and will never be shared
      </p>
    </form>
  );
};

export default EmailCaptureForm;
