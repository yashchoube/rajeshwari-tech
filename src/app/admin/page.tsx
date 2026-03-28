import { Suspense } from 'react';
import { getAllDemoBookings, getAllEnrollments, getAllNewsletterSubscriptions, getAnalyticsData, getReferrerData, getAllBlogs, getAllBlogsAdmin, getEnquiries, getPopularCategories, getDashboardTrends, getAnalyticsHistoryNew } from '@/lib/database';
import DashboardStats from '@/components/admin/DashboardStats';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import RecentActivity from '@/components/admin/RecentActivity';
import { Plus, ExternalLink, Settings, Bell, Users } from 'lucide-react';

// ----------------------
// Update Type: Changed
// Description: Updated database import source and added new dashboard components
// Updated By: Himanshu
// Updated Until: line 6
// ----------------------

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

interface CategoryData {
  category: string;
  post_count: number;
  total_views: number;
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

// ----------------------
// Update Type: Changed
// Description: Refactored dashboard to use new components (DashboardStats, AnalyticsChart, RecentActivity) and improved layout
// Updated By: Himanshu
// Updated Until: end of function
// ----------------------
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
  let popularCategories: CategoryData[] = [];
  let trends: any = null;
  let analyticsHistory: any[] = [];

  try {
    demoBookings = (await getAllDemoBookings()) as DemoBooking[];
    enrollments = (await getAllEnrollments()) as Enrollment[];
    enquiries = (await getEnquiries()) as Enquiry[];
    newsletterSubscriptions = (await getAllNewsletterSubscriptions()) as NewsletterSubscription[];
    analyticsData = (await getAnalyticsData()) as AnalyticsData[];
    referrerData = (await getReferrerData()) as ReferrerData[];
    blogs = (await getAllBlogs()) as Blog[];
    allBlogs = (await getAllBlogsAdmin()) as Blog[];
    popularCategories = await getPopularCategories();
    trends = await getDashboardTrends();
    analyticsHistory = await getAnalyticsHistoryNew(7);
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
    popularCategories = [];
    trends = null;
  }

  // Calculate total stats
  const stats = {
    totalViews: analyticsData.reduce((acc, curr) => acc + curr.visits, 0),
    totalBookings: demoBookings.length,
    totalEnquiries: enquiries.length,
    totalBlogs: blogs.length,
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all">
              <Settings className="w-5 h-5" />
            </button>
            {/* <a
              href="/admin/blogs"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </a> */}
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardStats stats={stats} trends={trends} />

        {/* Analytics & Charts */}
        <AnalyticsChart data={analyticsData} categoryData={popularCategories} historyData={analyticsHistory} pieChartType="page" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity (Left Column) */}
          <div className="lg:col-span-2">
            <RecentActivity
              enquiries={enquiries}
              bookings={demoBookings}
              enrollments={enrollments}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/admin/blogs" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors group">
                  <span className="font-medium">Manage Blogs</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/admin/enquiries" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors group">
                  <span className="font-medium">View Enquiries</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/admin/users" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition-colors group">
                  <span className="font-medium">User Management</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Newsletter Status */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Newsletter Status</h3>
              <p className="text-indigo-100 text-sm mb-6">
                You have {newsletterSubscriptions.length} active subscribers.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{newsletterSubscriptions.length}</div>
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm border border-white/10">
                View Subscribers
              </button>
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