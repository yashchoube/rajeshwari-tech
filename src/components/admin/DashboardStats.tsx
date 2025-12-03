'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Eye, ArrowUp, ArrowDown } from 'lucide-react';

// ----------------------
// Update Type: Added
// Description: Created new DashboardStats component to display key metrics (Views, Bookings, Enquiries, Blogs)
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface StatCardProps {
    title: string;
    value: string | number;
    icon: any;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color: string;
    delay: number;
}

const StatCard = ({ title, value, icon: Icon, trend, color, delay }: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={`flex items-center font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {trend.isPositive ? (
                            <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                            <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(trend.value)}%
                    </span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            )}
        </motion.div>
    );
};

interface DashboardStatsProps {
    stats: {
        totalViews: number;
        totalBookings: number;
        totalEnquiries: number;
        totalBlogs: number;
    };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const statItems = [
        {
            title: 'Total Views',
            value: stats.totalViews.toLocaleString(),
            icon: Eye,
            color: 'bg-blue-500',
            trend: { value: 12.5, isPositive: true }, // Mock trend data
        },
        {
            title: 'Demo Bookings',
            value: stats.totalBookings,
            icon: Calendar,
            color: 'bg-purple-500',
            trend: { value: 8.2, isPositive: true },
        },
        {
            title: 'Enquiries',
            value: stats.totalEnquiries,
            icon: Users,
            color: 'bg-orange-500',
            trend: { value: 2.4, isPositive: false },
        },
        {
            title: 'Published Blogs',
            value: stats.totalBlogs,
            icon: FileText,
            color: 'bg-green-500',
            trend: { value: 5.0, isPositive: true },
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item, index) => (
                <StatCard
                    key={item.title}
                    {...item}
                    delay={index * 0.1}
                />
            ))}
        </div>
    );
}
