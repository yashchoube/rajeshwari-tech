import AdminLayoutClient from './AdminLayoutClient';

/** Next.js 15: avoid static prerender + searchParams bugs for all DB-backed admin pages. */
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
