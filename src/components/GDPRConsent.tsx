import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const GDPRConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdprConsent');
    if (!consent) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprConsent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('gdprConsent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">We Value Your Privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.{' '}
              <a href="#" className="text-primary hover:underline">Learn more</a>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 md:flex-none border-border text-foreground hover:bg-muted"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Accept All
            </Button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 md:hidden p-1"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GDPRConsent;
