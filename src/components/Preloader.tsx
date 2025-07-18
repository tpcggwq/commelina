import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-sky-200 via-teal-100 to-blue-200 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Sand Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-60"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  scale: 0
                }}
                animate={{ 
                  y: -50,
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Wave Animation Background */}
          <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
            <motion.svg 
              viewBox="0 0 1200 120" 
              className="w-full h-full"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="rgba(20, 184, 166, 0.2)"
              />
            </motion.svg>
          </div>

          {/* 3D Logo Rising from Sand */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ y: 100, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  rotateY: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-teal-800 bg-clip-text text-transparent mb-4 drop-shadow-2xl transform-gpu perspective-1000">
                  Commelina Home
                </h1>
                
                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-black opacity-10 blur-sm transform translate-x-2 translate-y-2 -z-10">
                  Commelina Home
                </div>
                
                {/* Glass Reflection */}
                <div className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-white/30 to-transparent bg-clip-text text-transparent transform -skew-x-12 opacity-40">
                  Commelina Home
                </div>
              </motion.div>
            </motion.div>

            {/* Animated Wave Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <Waves className="w-16 h-16 text-teal-600 mx-auto drop-shadow-lg" />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.p 
              className="text-teal-700 mt-4 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Lüks deneyim yükleniyor... {progress}%
            </motion.p>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-teal-300 rounded-full opacity-60"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{ 
                  y: [null, -20, 20],
                  x: [null, -10, 10],
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;