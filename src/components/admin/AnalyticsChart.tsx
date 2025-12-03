'use client';

import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// ----------------------
// Update Type: Added
// Description: Created new AnalyticsChart component with AreaChart for traffic and PieChart for category/page distribution
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface AnalyticsData {
    page: string;
    visits: number;
    unique_referrers: number;
    last_visit: string;
}

export interface CategoryData {
    category: string;
    post_count: number;
    total_views: number;
}

interface AnalyticsChartProps {
    data: AnalyticsData[];
    categoryData: CategoryData[];
    pieChartType?: 'category' | 'page';
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

export default function AnalyticsChart({ data, categoryData, pieChartType = 'category' }: AnalyticsChartProps) {
    // Transform data for the chart if needed, or use as is
    // For this example, we'll assume 'data' is suitable for a simple bar/area chart
    // In a real app, you might want to aggregate visits by date

    // Mock time-series data for the area chart (since the provided interface is per-page)
    // In a real implementation, you'd fetch historical data
    const mockTimeSeriesData = [
        { name: 'Mon', visits: 4000, unique: 2400 },
        { name: 'Tue', visits: 3000, unique: 1398 },
        { name: 'Wed', visits: 2000, unique: 9800 },
        { name: 'Thu', visits: 2780, unique: 3908 },
        { name: 'Fri', visits: 1890, unique: 4800 },
        { name: 'Sat', visits: 2390, unique: 3800 },
        { name: 'Sun', visits: 3490, unique: 4300 },
    ];

    // Prepare data for the pie chart based on type
    const pieData = pieChartType === 'category'
        ? categoryData.map(item => ({
            name: item.category,
            value: item.total_views > 0 ? item.total_views : item.post_count,
            detail: item // Store full item for click handler
        })).filter(item => item.value > 0)
        : data.map(item => ({
            name: item.page,
            value: item.visits,
            detail: item
        })).filter(item => item.value > 0);

    // Group into Top 4 + Others to prevent legend overflow
    const processedPieData = (() => {
        if (pieData.length <= 5) return pieData;

        const sorted = [...pieData].sort((a, b) => b.value - a.value);
        const top4 = sorted.slice(0, 4);
        const others = sorted.slice(4);

        if (others.length === 0) return top4;

        const othersValue = others.reduce((sum, item) => sum + item.value, 0);

        return [
            ...top4,
            {
                name: 'Others',
                value: othersValue,
                detail: {
                    page: 'Others',
                    visits: othersValue,
                    unique_referrers: 0,
                    last_visit: new Date().toISOString()
                } as AnalyticsData
            }
        ];
    })();

    // If no data, we might want to show a placeholder or keep it empty but safe
    const hasData = processedPieData.length > 0;

    const handlePieClick = (entry: any) => {
        if (entry.name === 'Others') {
            return; // Or show a list of other pages if desired
        }

        if (pieChartType === 'page') {
            const detail = entry.detail as AnalyticsData;
            // Navigate to the detail page
            window.location.href = `/admin/analytics/details?page=${encodeURIComponent(detail.page)}`;
        } else {
            const detail = entry.detail as CategoryData;
            alert(`Category Details:\n\nCategory: ${detail.category}\nTotal Views: ${detail.total_views}\nPost Count: ${detail.post_count}`);
        }
    };



    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Area Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Traffic Overview</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={mockTimeSeriesData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="visits"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorVisits)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Pie Chart - Popular Categories */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white rounded-2xl p-6  shadow-sm border border-gray-100"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                    {pieChartType === 'page' ? 'Page Visits Distribution' : 'Popular Categories'}
                </h3>
                <div className="w-full flex flex-col items-center justify-center">
                    {hasData ? (
                        <>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={processedPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {processedPieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    onClick={() => handlePieClick(entry)}
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {processedPieData.map((entry, index) => (
                                    <div
                                        key={`legend-${index}`}
                                        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => handlePieClick(entry)}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-sm text-gray-600 truncate max-w-[200px]" title={entry.name}>
                                            {entry.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-[300px] flex flex-col items-center justify-center text-center text-gray-500">
                            <p>No category data available yet.</p>
                            <p className="text-sm mt-1">Create blogs to see analytics.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
