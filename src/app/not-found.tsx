import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center py-16 px-10 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="relative mb-10">
          <div className="text-[8rem] font-black text-indigo-50/50 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
        </div>
        
        <h2 className="text-4xl font-black text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          The page you're looking for was lost in cyberspace. Let's get you back on track!
        </p>

        <Link
          href="/"
          className="inline-flex items-center px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-wide hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 active:scale-95 transform"
        >
          BACK TO MISSION CONTROL
        </Link>

        <div className="mt-12 pt-8 border-t border-gray-50">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
            Rajeshwari Tech | Excellence in Education
          </p>
        </div>
      </div>
    </div>
  );
}
