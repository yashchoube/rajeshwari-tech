import { Suspense } from 'react';
import { getPageAnalytics } from '@/lib/database';
import { ArrowLeft, Clock, Eye, Globe } from 'lucide-react';
import Link from 'next/link';

// ----------------------
// Update Type: Added
// Description: Created new Analytics Details Page to show specific page statistics
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

async function AnalyticsDetails({ searchParams }: PageProps) {
    const page = typeof searchParams.page === 'string' ? searchParams.page : '/';
    const data = await getPageAnalytics(page);

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No Data Found</h1>
                    <p className="text-gray-600 mb-4">Could not find analytics data for page: {page}</p>
                    <Link href="/admin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin"
                        className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Page Analytics</h1>
                    <p className="text-gray-500 mt-1 font-mono text-sm bg-gray-100 inline-block px-2 py-1 rounded">
                        {data.page}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Visits Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Eye className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Visits</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{data.visits}</p>
                    </div>

                    {/* Unique Referrers Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <Globe className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Unique Referrers</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{data.unique_referrers}</p>
                    </div>

                    {/* Last Visit Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Last Visit</h3>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                            {new Date(data.last_visit).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(data.last_visit).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                {/* Additional Details or Charts could go here */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">About this Page</h3>
                    <p className="text-gray-600">
                        This page has received a total of <strong>{data.visits}</strong> visits.
                        The last interaction was recorded on <strong>{new Date(data.last_visit).toLocaleDateString()}</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Page({ searchParams }: PageProps) {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <AnalyticsDetails searchParams={searchParams} />
        </Suspense>
    );
}
