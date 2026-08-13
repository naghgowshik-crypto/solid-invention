import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '+',
  label,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center p-6 glass-panel rounded-xl border border-amber-500/20 shadow-card-dark">
      <div className="text-4xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-400 to-gold-500">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-xs md:text-sm font-semibold tracking-wider text-slate-400 uppercase">
        {label}
      </div>
    </div>
  );
};
