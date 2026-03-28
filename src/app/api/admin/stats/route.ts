import { NextRequest, NextResponse } from 'next/server';
import {
    getBlogViewsLast30Days,
    getNewSubscribersCount,
    getBlogEngagementStats,
    getPopularCategories,
    getPendingCommentsCount,
    getPendingBlogsCount,
    getAllBlogsAdmin,
    getAnalyticsData,
    getDashboardTrends,
    getAnalyticsHistoryNew
} from '@/lib/database';

/**
 * Admin Statistics API
 * Returns comprehensive dashboard statistics for the admin blog page
 */
export async function GET(request: NextRequest) {
    try {
        // Fetch all statistics
        const viewsLast30Days = await getBlogViewsLast30Days();
        const newSubscribers = await getNewSubscribersCount(30);
        const engagementStats = await getBlogEngagementStats();
        const popularCategories = await getPopularCategories();
        const pendingComments = await getPendingCommentsCount();
        const pendingBlogs = await getPendingBlogsCount();
        const allBlogs = await getAllBlogsAdmin();
        const analyticsData = await getAnalyticsData();
        const trends = await getDashboardTrends();
        const analyticsHistory = await getAnalyticsHistoryNew(7);

        // Calculate post interests (top category)
        const topCategory = popularCategories.length > 0
            ? popularCategories[0].category
            : 'N/A';

        const stats = {
            viewsLast30Days,
            newSubscribers,
            avgEngagementRate: engagementStats.engagementRate,
            postInterests: topCategory,
            popularCategories,
            pendingComments,
            pendingBlogs,
            totalBlogs: allBlogs.length,
            publishedBlogs: allBlogs.filter(b => b.status === 'published').length,
            pendingBlogsCount: allBlogs.filter(b => b.status === 'pending').length,
            totalViews: engagementStats.totalViews,
            analyticsData,
            trends,
            analyticsHistory
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching admin statistics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
