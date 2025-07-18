import React, { useMemo } from 'react';

interface BubbleBackgroundProps {
  count?: number;
  zIndex?: number;
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({ count = 18, zIndex = 1 }) => {
  // Sabit baloncuklar üret
  const bubbles = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      width: 16 + Math.random() * 32,
      height: 16 + Math.random() * 32,
      left: Math.random() * 98,
      bottom: Math.random() * 95,
      delay: i * 0.7
    }))
  ), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-200 opacity-30"
          style={{
            width: `${b.width}px`,
            height: `${b.height}px`,
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            animation: `bubbleUp 1s linear infinite ${b.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes bubbleUp {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BubbleBackground; 