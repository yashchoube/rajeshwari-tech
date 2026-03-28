'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Shield, Users, FileText, BarChart3, Settings, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      if (pathname !== '/admin/login') {
        checkAuth();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/check');
      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        console.log('User not authenticated, redirecting to login');
        router.push('/admin/login');
      }
    } catch (error) {
      console.log('Auth check failed, redirecting to login:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3, current: pathname === '/admin' },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare, current: pathname === '/admin/enquiries' },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText, current: pathname === '/admin/blogs' },
    { name: 'Users', href: '/admin/users', icon: Users, current: pathname === '/admin/users' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: pathname === '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center w-full' : 'space-x-3'
              }`}>
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Admin Panel</h1>
                  <p className="text-xs text-gray-500 whitespace-nowrap">RajeshwariTech</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
              )}
            </button>
          </div>

          <div className="px-6 py-4 border-b border-gray-200">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'
              }`}>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-indigo-600">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
                  <p className="text-xs text-gray-500 truncate">{user.role}</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'
                    } px-3 py-2 rounded-lg text-sm font-medium transition-all ${item.current
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  title={sidebarCollapsed ? item.name : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </a>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'
                } w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-64'
        }`}>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
