import { NextResponse } from 'next/server';
import { getAnalyticsHistoryNew } from '@/lib/database';

export async function GET() {
    try {
        let history: { date: string; views: number }[] = [];

        try {
            history = getAnalyticsHistoryNew(30);
        } catch (dbError) {
            console.error('Database error fetching analytics history:', dbError);
        }

        // If no data, return empty array (frontend will handle mock data)
        return NextResponse.json({
            success: true,
            data: history
        });

    } catch (error) {
        console.error('Error in analytics history API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics history' },
            { status: 500 }
        );
    }
}
