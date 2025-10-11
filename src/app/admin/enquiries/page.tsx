import { Suspense } from 'react';
import { getEnquiries } from '@/lib/neon-database';

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

async function EnquiriesPage() {
  let enquiries: Enquiry[] = [];

  try {
    enquiries = await getEnquiries();
  } catch (error) {
    console.error('Error fetching enquiries:', error);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceColor = (service: string) => {
    switch (service.toLowerCase()) {
      case 'corporate training':
        return 'bg-purple-100 text-purple-800';
      case 'freelance development':
        return 'bg-indigo-100 text-indigo-800';
      case 'consulting':
        return 'bg-green-100 text-green-800';
      case 'mentorship':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Enquiries</h1>
              <p className="text-gray-600 mt-2">Manage and track all contact form submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                <span className="text-sm text-gray-600">Total Enquiries:</span>
                <span className="ml-2 font-semibold text-lg text-gray-900">{enquiries.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Enquiries</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {enquiries.filter(e => e.status === 'new').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {enquiries.filter(e => e.status === 'contacted').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Corporate Training</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {enquiries.filter(e => e.service.toLowerCase().includes('corporate')).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Freelance</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {enquiries.filter(e => e.service.toLowerCase().includes('freelance')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Enquiries</h2>
            <p className="text-sm text-gray-600">Manage and respond to contact form submissions</p>
          </div>

          {enquiries.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No enquiries yet</h3>
              <p className="mt-1 text-sm text-gray-500">Contact form submissions will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-medium text-gray-900">{enquiry.name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getServiceColor(enquiry.service)}`}>
                          {enquiry.service}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {enquiry.email}
                          </p>
                          {enquiry.phone && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Phone:</span> {enquiry.phone}
                            </p>
                          )}
                          {enquiry.company && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Company:</span> {enquiry.company}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Service:</span> {enquiry.service}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Submitted:</span> {new Date(enquiry.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {enquiry.message && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Message:</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Reply
                        </a>
                        
                        {enquiry.phone && (
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                          </a>
                        )}
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

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <EnquiriesPage />
    </Suspense>
  );
}
