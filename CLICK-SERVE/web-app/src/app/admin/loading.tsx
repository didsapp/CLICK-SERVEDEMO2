export default function AdminLoading() {
    return (
        <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:w-64 flex-col bg-white border-r border-gray-100">
                <div className="p-6">
                    <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="px-4 space-y-2 mt-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                    ))}
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 lg:pl-64 flex flex-col">
                {/* Header Skeleton */}
                <div className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 p-8 space-y-8">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-72 bg-white rounded-2xl border border-gray-100 animate-pulse" />

                    {/* Table Placeholder */}
                    <div className="h-48 bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
            </div>
        </div>
    )
}
