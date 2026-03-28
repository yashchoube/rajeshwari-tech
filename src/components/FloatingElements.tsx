'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Seeded random generator for consistent values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const FloatingElements = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomValue = (index: number, type: 'x' | 'y' | 'opacity' | 'duration' | 'delay') => {
    const seed = index + (type === 'x' ? 1 : type === 'y' ? 2 : type === 'opacity' ? 3 : type === 'duration' ? 4 : 5);
    const random = seededRandom(seed);
    
    switch (type) {
      case 'x':
      case 'y':
        return random * 100;
      case 'opacity':
        return random * 0.5 + 0.1;
      case 'duration':
        return random * 10 + 10;
      case 'delay':
        return random * 10;
      default:
        return random;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -70, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
      />
      
      {/* Floating Sparkles/Dots */}
      {isClient && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: getRandomValue(i, 'x') + "%", 
            y: getRandomValue(i, 'y') + "%",
            opacity: getRandomValue(i, 'opacity')
          }}
          animate={{
            y: [null, getRandomValue(i, 'y') * -1 - 50],
            opacity: [null, 0]
          }}
          transition={{
            duration: getRandomValue(i, 'duration'),
            repeat: Infinity,
            ease: "linear",
            delay: getRandomValue(i, 'delay')
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
        />
      ))}

      {/* Decorative SVG Patterns */}
      <svg className="absolute top-0 right-0 w-1/3 h-1/2 opacity-10 text-indigo-300" viewBox="0 0 400 600">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Code Snippets (Visual only) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-10 text-indigo-400/20 font-mono text-sm hidden lg:block"
      >
        <pre>{`class HeroSection {
  constructor() {
    this.vibe = "Premium";
    this.status = "Coding";
  }
}`}</pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-1/4 right-10 text-purple-400/20 font-mono text-sm hidden lg:block text-right"
      >
        <pre>{`const masterTech = async () => {
  await learning();
  return "Success";
};`}</pre>
      </motion.div>
    </div>
  );
};

export default FloatingElements;
