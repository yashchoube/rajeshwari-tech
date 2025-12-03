'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, GraduationCap, ChevronRight } from 'lucide-react';

// ----------------------
// Update Type: Added
// Description: Created new RecentActivity component to display latest enquiries, bookings, and enrollments
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface RecentActivityProps {
    enquiries: any[];
    bookings: any[];
    enrollments: any[];
}

export default function RecentActivity({ enquiries, bookings, enrollments }: RecentActivityProps) {
    const [activeTab, setActiveTab] = useState<'enquiries' | 'bookings' | 'enrollments'>('enrollments');

    const tabs = [
        { id: 'enrollments', label: 'Enrollments', icon: GraduationCap, count: enrollments.length },
        { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, count: enquiries.length },
        { id: 'bookings', label: 'Demo Bookings', icon: Calendar, count: bookings.length },
    ];

    const getData = () => {
        switch (activeTab) {
            case 'enquiries': return enquiries;
            case 'bookings': return bookings;
            case 'enrollments': return enrollments;
            default: return [];
        }
    };

    const data = getData().slice(0, 5); // Show top 5

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                        {data.length > 0 && (
                            <a
                                href={`/admin/${activeTab}`}
                                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                View All
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                        )}
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto max-w-full no-scrollbar">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {tab.label}
                                    <span className="ml-2 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md text-xs">
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {data.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12 text-gray-500"
                            >
                                No recent {activeTab} found.
                            </motion.div>
                        ) : (
                            data.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className={`p-2 rounded-lg mr-4 ${activeTab === 'enquiries' ? 'bg-orange-100 text-orange-600' :
                                        activeTab === 'bookings' ? 'bg-purple-100 text-purple-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                        {activeTab === 'enquiries' && <MessageSquare className="w-5 h-5" />}
                                        {activeTab === 'bookings' && <Calendar className="w-5 h-5" />}
                                        {activeTab === 'enrollments' && <GraduationCap className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                                                {item.name || item.email}
                                            </h4>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 truncate">
                                            {activeTab === 'enquiries' && (item.message || item.service)}
                                            {activeTab === 'bookings' && `Course: ${item.course}`}
                                            {activeTab === 'enrollments' && `Course: ${item.course_name}`}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.status === 'new' || item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'confirmed' || item.status === 'contacted' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="ml-4 p-2 text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>


            </div>
        </motion.div>
    );
}
