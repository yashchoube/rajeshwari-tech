'use client';

import { motion } from 'framer-motion';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Programming Icons */}
      <motion.div
        className="absolute top-20 left-20 text-indigo-200/30 text-3xl"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        💻
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 text-purple-200/30 text-2xl"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        ⚡
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-32 text-cyan-200/30 text-xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        🚀
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-20 text-green-200/30 text-lg"
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        📚
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3 text-yellow-200/30 text-2xl"
        animate={{
          y: [0, 35, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        🎯
      </motion.div>

      {/* Floating Code Brackets */}
      <motion.div
        className="absolute top-1/3 left-16 text-gray-300/20 font-mono text-lg"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {'{'}
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-16 text-gray-300/20 font-mono text-lg"
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        {'}'}
      </motion.div>

      {/* Floating Dots */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-indigo-300/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-300/20 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-4 h-4 bg-cyan-300/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
};

export default FloatingElements;
