import GlassLoader from '@/components/GlassLoader';

// ----------------------
// Update Type: Added
// Description: Created new Admin Loading component with GlassLoader
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

export default function AdminLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8">
                <GlassLoader />
                <p className="text-center mt-8 text-gray-500 font-medium animate-pulse">
                    Loading Dashboard...
                </p>
            </div>
        </div>
    );
}
