import { Suspense } from 'react';
import { getAllEnrollments } from '@/lib/database';

// ----------------------
// Update Type: Added
// Description: Created new Enrollments Page to manage course enrollments
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface Enrollment {
    id: number;
    name: string;
    email: string;
    phone: string;
    course_name: string;
    experience: string;
    goals?: string;
    referral?: string;
    created_at: string;
    status: string;
}

async function EnrollmentsPage() {
    let enrollments: Enrollment[] = [];

    try {
        enrollments = getAllEnrollments() as unknown as Enrollment[];
    } catch (error) {
        console.error('Error fetching enrollments:', error);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
            case 'enrolled':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'dropped':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Enrollments</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage and track all course enrollments</p>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border w-full sm:w-auto">
                                <span className="text-xs sm:text-sm text-gray-600">Total Enrollments:</span>
                                <span className="ml-2 font-semibold text-base sm:text-lg text-gray-900">{enrollments.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enrollments List */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">All Enrollments</h2>
                        <p className="text-sm text-gray-600">Manage student enrollments</p>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No enrollments yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Course enrollments will appear here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {enrollments.map((enrollment) => (
                                <div key={enrollment.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Name and badges */}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                                <h3 className="text-base sm:text-lg font-medium text-gray-900">{enrollment.name}</h3>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                                                        {enrollment.status}
                                                    </span>
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                                        {enrollment.course_name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Contact details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Email:</span> {enrollment.email}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Phone:</span> {enrollment.phone}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Experience:</span> {enrollment.experience}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        <span className="font-medium">Submitted:</span> {new Date(enrollment.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Goals */}
                                            {enrollment.goals && (
                                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Goals:</h4>
                                                    <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">{enrollment.goals}</p>
                                                </div>
                                            )}

                                            {/* Action buttons */}
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                                <a
                                                    href={`mailto:${enrollment.email}`}
                                                    className="inline-flex items-center justify-center sm:justify-start px-4 py-2.5 sm:py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                                >
                                                    Reply via Email
                                                </a>
                                                <a
                                                    href={`tel:${enrollment.phone}`}
                                                    className="inline-flex items-center justify-center sm:justify-start px-4 py-2.5 sm:py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                                >
                                                    Call Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AdminEnrollmentsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <EnrollmentsPage />
        </Suspense>
    );
}
