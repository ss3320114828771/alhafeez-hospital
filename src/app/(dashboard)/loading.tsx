export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar Skeleton */}
      <div className="fixed left-0 top-0 w-64 h-full bg-black/30 p-4">
        <div className="space-y-4">
          <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-white/10 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-white/10 rounded-lg w-48 animate-pulse"></div>
          <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass p-6 rounded-xl">
              <div className="h-4 bg-white/10 rounded-lg w-20 mb-2 animate-pulse"></div>
              <div className="h-8 bg-white/10 rounded-lg w-24 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="glass p-6 rounded-xl h-64">
              <div className="h-4 bg-white/10 rounded-lg w-32 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-8 bg-white/10 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}