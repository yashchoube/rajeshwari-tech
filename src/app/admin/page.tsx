import { Suspense } from 'react';
import { getAllDemoBookings, getAllEnrollments, getAllNewsletterSubscriptions, getAnalyticsData, getReferrerData, getAllBlogs, getAllBlogsAdmin, getEnquiries } from '@/lib/neon-database';

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

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status: string;
  created_at: string;
}

async function AdminDashboard() {
  // Fetch data from database
  let demoBookings: DemoBooking[] = [];
  let enrollments: Enrollment[] = [];
  let enquiries: Enquiry[] = [];
  let newsletterSubscriptions: NewsletterSubscription[] = [];
  let analyticsData: AnalyticsData[] = [];
  let referrerData: ReferrerData[] = [];
  let blogs: Blog[] = [];
  let allBlogs: Blog[] = [];

  try {
    // Fetch all data from Neon database
    demoBookings = await getAllDemoBookings();
    enrollments = await getAllEnrollments();
    enquiries = await getEnquiries();
    newsletterSubscriptions = await getAllNewsletterSubscriptions();
    analyticsData = await getAnalyticsData();
    referrerData = await getReferrerData();
    blogs = await getAllBlogs();
    allBlogs = await getAllBlogsAdmin();
  } catch (error) {
    console.error('Error fetching admin data:', error);
    // Reset to empty arrays if database fails
    demoBookings = [];
    enrollments = [];
    enquiries = [];
    newsletterSubscriptions = [];
    analyticsData = [];
    referrerData = [];
    blogs = [];
    allBlogs = [];
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
                      <p><strong>Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{booking.status}</span></p>
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
                  <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{enrollment.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(enrollment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Email:</strong> {enrollment.email}</p>
                      <p><strong>Phone:</strong> {enrollment.phone}</p>
                      <p><strong>Course:</strong> {enrollment.course_name}</p>
                      <p><strong>Experience:</strong> {enrollment.experience}</p>
                      {enrollment.goals && (
                        <p><strong>Goals:</strong> {enrollment.goals}</p>
                      )}
                      {enrollment.referral && (
                        <p><strong>Referral:</strong> {enrollment.referral}</p>
                      )}
                      <p><strong>Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          enrollment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{enrollment.status}</span></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Enquiries */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Enquiries ({enquiries.length})
              </h2>
              <a
                href="/admin/enquiries"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                View All
              </a>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {enquiries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No enquiries yet</p>
              ) : (
                enquiries.slice(0, 5).map((enquiry) => (
                  <div key={enquiry.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{enquiry.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          enquiry.status === 'contacted' ? 'bg-green-100 text-green-800' :
                          enquiry.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>{enquiry.status}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Email:</strong> {enquiry.email}</p>
                      {enquiry.phone && (
                        <p><strong>Phone:</strong> {enquiry.phone}</p>
                      )}
                      {enquiry.company && (
                        <p><strong>Company:</strong> {enquiry.company}</p>
                      )}
                      <p><strong>Service:</strong> {enquiry.service}</p>
                      {enquiry.message && (
                        <p className="text-gray-700 line-clamp-2"><strong>Message:</strong> {enquiry.message}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {enquiries.length > 5 && (
                <div className="text-center pt-4">
                  <a
                    href="/admin/enquiries"
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    View {enquiries.length - 5} more enquiries →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Subscriptions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Newsletter Subscriptions ({newsletterSubscriptions.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {newsletterSubscriptions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No subscriptions yet</p>
              ) : (
                newsletterSubscriptions.map((sub) => (
                  <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{sub.email}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Interests:</strong> {sub.interests}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {sub.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Analytics Overview
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {analyticsData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No analytics data yet</p>
              ) : (
                analyticsData.map((data) => (
                  <div key={data.page} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{data.page}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Visits:</strong> {data.visits}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Last Visit:</strong> {new Date(data.last_visit).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
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
            <div className="mt-6 text-center">
              <a
                href="/admin/blogs"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Blog Management
              </a>
            </div>
          </div>
        </div>

        {/* Referrer Data */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Referrer Data
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {referrerData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No referrer data yet</p>
              ) : (
                referrerData.map((data) => (
                  <div key={data.referrer} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{data.referrer}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Visits:</strong> {data.visits}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Last Visit:</strong> {new Date(data.last_visit).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
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