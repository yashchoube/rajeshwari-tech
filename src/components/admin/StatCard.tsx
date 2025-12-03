'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// ----------------------
// Update Type: Added
// Description: Created new StatCard component for displaying dashboard statistics
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    gradientFrom: string;
    gradientTo: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    delay?: number;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    gradientFrom,
    gradientTo,
    trend,
    delay = 0
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{title}</p>
                    <motion.h3
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: delay + 0.2, duration: 0.5, ease: 'backOut' }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900"
                    >
                        {value}
                    </motion.h3>
                    {trend && (
                        <div className="mt-1 sm:mt-2 flex items-center space-x-1">
                            <span
                                className={`text-xs font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    )}
                </div>
                <div
                    className="hidden sm:flex w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br items-center justify-center shadow-lg flex-shrink-0"
                    style={{
                        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
                    }}
                >
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
            </div>
        </motion.div>
    );
}
