'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-20 left-10 text-white/10 font-mono text-sm"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {`<div className="code">`}
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-white/10 font-mono text-sm"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        {`function learn() {`}
      </motion.div>

      <motion.div
        className="absolute top-60 left-1/4 text-white/10 font-mono text-sm"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        {`return success;`}
      </motion.div>

      <motion.div
        className="absolute top-80 right-1/3 text-white/10 font-mono text-sm"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        {`</div>`}
      </motion.div>

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-32 right-32 w-4 h-4 border-2 border-white/20 rotate-45"
        animate={{
          rotate: [45, 405, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-40 w-6 h-6 border-2 border-white/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-16 w-8 h-8 border-2 border-white/10 transform rotate-12"
        animate={{
          rotate: [12, 372, 12],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Dots */}
      <motion.div
        className="absolute top-1/4 left-16 w-2 h-2 bg-white/20 rounded-full"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-40 w-3 h-3 bg-white/15 rounded-full"
        animate={{
          y: [0, 35, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Tech Icons */}
      <motion.div
        className="absolute top-1/3 left-1/3 text-white/10 text-2xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        ⚡
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/2 text-white/10 text-xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🚀
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-1/4 text-white/10 text-lg"
        animate={{
          x: [0, 30, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        💻
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
