import { getAllDemoBookings, getAllEnrollments, getAllNewsletterSubscriptions, getAnalyticsData, getReferrerData, getAllBlogs, getAllBlogsAdmin } from '@/lib/database';
import { Suspense } from 'react';
import EnrollmentCard from '@/components/EnrollmentCard';
import { AuthService } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

interface DemoBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  preferred_time: string;
  message?: string;
  created_at: string;
  status: string;
}

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

interface NewsletterSubscription {
  id: number;
  email: string;
  name?: string;
  interests: string;
  status: string;
  created_at: string;
  last_sent?: string;
}

interface AnalyticsData {
  page: string;
  visits: number;
  unique_referrers: number;
  last_visit: string;
}

interface ReferrerData {
  referrer: string;
  visits: number;
  last_visit: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image: string;
  category: string;
  tags: string;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

async function AdminDashboard() {
  // Fetch data from API instead of calling database functions directly
  let demoBookings: DemoBooking[] = [];
  let enrollments: Enrollment[] = [];
  let newsletterSubscriptions: NewsletterSubscription[] = [];
  let analyticsData: AnalyticsData[] = [];
  let referrerData: ReferrerData[] = [];
  let blogs: Blog[] = [];
  let allBlogs: Blog[] = [];

  try {
    // Fetch demo bookings
    const demoResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/demo-bookings`, {
      cache: 'no-store'
    });
    if (demoResponse.ok) {
      const demoData = await demoResponse.json();
      demoBookings = demoData.demoBookings || [];
    }

    // Fetch enrollments
    const enrollResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/enrollments`, {
      cache: 'no-store'
    });
    if (enrollResponse.ok) {
      const enrollData = await enrollResponse.json();
      enrollments = enrollData.enrollments || [];
    }

    // Fetch blogs
    const blogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs?scope=admin`, {
      cache: 'no-store'
    });
    if (blogsResponse.ok) {
      const blogsData = await blogsResponse.json();
      allBlogs = blogsData.blogs || [];
      blogs = allBlogs.filter((blog: Blog) => blog.status === 'published');
    }

    // Fetch other data (keeping direct calls for now)
    newsletterSubscriptions = getAllNewsletterSubscriptions() as NewsletterSubscription[];
    analyticsData = getAnalyticsData() as AnalyticsData[];
    referrerData = getReferrerData() as ReferrerData[];
  } catch (error) {
    console.error('Error fetching admin data:', error);
    // Fallback to direct database calls
    demoBookings = getAllDemoBookings() as DemoBooking[];
    enrollments = getAllEnrollments() as Enrollment[];
    newsletterSubscriptions = getAllNewsletterSubscriptions() as NewsletterSubscription[];
    analyticsData = getAnalyticsData() as AnalyticsData[];
    referrerData = getReferrerData() as ReferrerData[];
    blogs = getAllBlogs();
    allBlogs = getAllBlogsAdmin();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage demo bookings, enrollments, and view analytics</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Demo Bookings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Demo Bookings ({demoBookings.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {demoBookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No demo bookings yet</p>
              ) : (
                demoBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{booking.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Email:</strong> {booking.email}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p><strong>Course:</strong> {booking.course}</p>
                      <p><strong>Experience:</strong> {booking.experience}</p>
                      <p><strong>Preferred Time:</strong> {booking.preferred_time}</p>
                      {booking.message && (
                        <p><strong>Message:</strong> {booking.message}</p>
                      )}
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        booking.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Enrollments */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enrollments ({enrollments.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {enrollments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No enrollments yet</p>
              ) : (
                enrollments.map((enrollment) => (
                  <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))
              )}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Page Analytics
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {analyticsData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No analytics data yet</p>
              ) : (
                analyticsData.map((data) => (
                  <div key={data.page} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{data.page}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(data.last_visit).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Visits:</strong> {data.visits}</p>
                      <p><strong>Unique Referrers:</strong> {data.unique_referrers}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Referrers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Top Referrers
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {referrerData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No referrer data yet</p>
              ) : (
                referrerData.map((data) => (
                  <div key={data.referrer} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm truncate">{data.referrer}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(data.last_visit).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Visits:</strong> {data.visits}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Subscriptions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Newsletter Subscriptions ({newsletterSubscriptions.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {newsletterSubscriptions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No newsletter subscriptions yet</p>
            ) : (
              newsletterSubscriptions.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{subscription.email}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(subscription.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {subscription.name && (
                      <p><strong>Name:</strong> {subscription.name}</p>
                    )}
                    <p><strong>Interests:</strong> {subscription.interests}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600">{demoBookings.length}</div>
            <div className="text-gray-600">Total Demo Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{enrollments.length}</div>
            <div className="text-gray-600">Total Enrollments</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {analyticsData.reduce((total, data) => total + data.visits, 0)}
            </div>
            <div className="text-gray-600">Total Page Views</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">
              {demoBookings.length + enrollments.length + newsletterSubscriptions.length}
            </div>
            <div className="text-gray-600">Total Leads</div>
          </div>
        </div>

        {/* Blog Management Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Blog Management ({allBlogs.length} total, {blogs.length} published)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{blogs.length}</div>
                <div className="text-gray-600">Published Blogs</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{allBlogs.length - blogs.length}</div>
                <div className="text-gray-600">Draft/Pending Blogs</div>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="/admin/blogs" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Manage Blogs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
