'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ----------------------
// Update Type: Added
// Description: Created new GlassLoader component for loading states
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

const GlassLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Random increment for realistic loading feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[400px] w-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-xl">
            <div className="relative w-48 h-48">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />

                {/* Main Glass Container */}
                <div className="relative w-full h-full rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden flex items-center justify-center">

                    {/* Liquid Animation Background */}
                    <motion.div
                        className="absolute inset-0 opacity-50"
                        animate={{
                            background: [
                                'linear-gradient(0deg, #4f46e5 0%, #c026d3 100%)',
                                'linear-gradient(180deg, #4f46e5 0%, #c026d3 100%)',
                                'linear-gradient(360deg, #4f46e5 0%, #c026d3 100%)',
                            ],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            filter: 'blur(20px)',
                            transform: 'scale(1.5)',
                        }}
                    />

                    {/* Inner Swirling Liquid */}
                    <motion.div
                        className="absolute w-[200%] h-[200%] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            borderRadius: '40%',
                        }}
                    />

                    {/* Center Glass Circle (for text) */}
                    <div className="relative z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-inner flex items-center justify-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {/* Orbiting Ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full border-t-2 border-r-2 border-white/40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Counter-rotating Ring */}
                    <motion.div
                        className="absolute inset-6 rounded-full border-b-2 border-l-2 border-indigo-300/30"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GlassLoader;
