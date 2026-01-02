import { useState, useEffect } from 'react';
import { Clock, Flame, Zap } from 'lucide-react';

const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-secondary overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap py-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="flex items-center gap-2 text-secondary-foreground font-semibold">
              <Flame className="w-4 h-4" />
              FLASH SALE ENDING SOON
            </span>
            <span className="flex items-center gap-2 text-secondary-foreground font-semibold">
              <Clock className="w-4 h-4" />
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
            <span className="flex items-center gap-2 text-secondary-foreground font-semibold">
              <Zap className="w-4 h-4" />
              UP TO 50% OFF
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgencyBanner;
