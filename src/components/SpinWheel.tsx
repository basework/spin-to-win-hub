import { useState, useRef, useEffect } from 'react';
import { Prize } from '@/lib/prizeStore';

interface SpinWheelProps {
  prizes: Prize[];
  onSpinEnd: (prize: Prize) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
}

const SpinWheel = ({ prizes, onSpinEnd, isSpinning, setIsSpinning }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);
  const prizeRef = useRef<Prize | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    // Calculate winning prize based on probability
    const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);
    let random = Math.random() * totalProbability;
    let winningIndex = 0;
    
    for (let i = 0; i < prizes.length; i++) {
      random -= prizes[i].probability;
      if (random <= 0) {
        winningIndex = i;
        break;
      }
    }

    prizeRef.current = prizes[winningIndex];

    // Calculate rotation to land on winning segment
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (winningIndex * segmentAngle) - (segmentAngle / 2);
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const finalRotation = rotation + (spins * 360) + targetAngle + (Math.random() * 20 - 10);

    setIsSpinning(true);
    setRotation(finalRotation);
  };

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
        if (prizeRef.current) {
          onSpinEnd(prizeRef.current);
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning, onSpinEnd, setIsSpinning]);

  const segmentAngle = 360 / prizes.length;

  const createSegmentPath = (index: number) => {
    const startAngle = index * segmentAngle - 90;
    const endAngle = startAngle + segmentAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const radius = 150;
    const centerX = 160;
    const centerY = 160;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getLabelPosition = (index: number) => {
    const angle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
    const radius = 100;
    const x = 160 + radius * Math.cos(angle);
    const y = 160 + radius * Math.sin(angle);
    const rotation = index * segmentAngle + segmentAngle / 2;
    return { x, y, rotation };
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-gold opacity-20 blur-xl animate-pulse" />
      
      {/* Pointer */}
      <div className="absolute -top-2 z-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] border-t-primary drop-shadow-lg" />
      
      {/* Wheel container */}
      <div 
        className="relative cursor-pointer"
        onClick={spinWheel}
      >
        <svg
          ref={wheelRef}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {/* Wheel border */}
          <circle cx="160" cy="160" r="155" fill="none" stroke="hsl(38 100% 50%)" strokeWidth="6" />
          
          {/* Segments */}
          {prizes.map((prize, index) => (
            <path
              key={prize.id}
              d={createSegmentPath(index)}
              fill={prize.color}
              stroke="hsl(240 10% 10%)"
              strokeWidth="2"
            />
          ))}

          {/* Labels */}
          {prizes.map((prize, index) => {
            const { x, y, rotation } = getLabelPosition(index);
            return (
              <text
                key={`label-${prize.id}`}
                x={x}
                y={y}
                fill="white"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${rotation}, ${x}, ${y})`}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                {prize.label}
              </text>
            );
          })}

          {/* Center circle */}
          <circle cx="160" cy="160" r="30" fill="hsl(240 10% 8%)" stroke="hsl(38 100% 50%)" strokeWidth="4" />
          <text
            x="160"
            y="160"
            fill="hsl(38 100% 50%)"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            SPIN
          </text>
        </svg>
      </div>

      {/* Decorative lights */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x = 160 + 165 * Math.cos(angle);
          const y = 160 + 165 * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary animate-pulse"
              style={{
                left: x - 6,
                top: y - 6,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpinWheel;
