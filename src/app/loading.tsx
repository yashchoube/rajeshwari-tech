import GlassLoader from '@/components/GlassLoader';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8">
                <GlassLoader />
                <p className="text-center mt-8 text-gray-500 font-medium animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
