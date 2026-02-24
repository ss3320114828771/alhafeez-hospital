export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            {/* Title */}
            <div className="h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg w-64 animate-pulse"></div>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-white/10 rounded-lg w-16 animate-pulse"></div>
              <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
              <div className="h-4 bg-white/10 rounded-lg w-20 animate-pulse"></div>
              <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
              <div className="h-4 bg-white/10 rounded-lg w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-white/10 pb-4">
          {[1, 2, 3].map((tab) => (
            <div
              key={tab}
              className="h-10 bg-white/10 rounded-lg w-24 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((stat) => (
          <div
            key={stat}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-white/10 rounded-lg w-24 animate-pulse"></div>
              <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-8 bg-white/10 rounded-lg w-32 animate-pulse mb-2"></div>
            <div className="h-3 bg-white/10 rounded-lg w-20 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="h-6 bg-white/10 rounded-lg w-32 mb-6 animate-pulse"></div>
            
            {/* Team Members */}
            <div className="space-y-4 mb-8">
              <div className="h-4 bg-white/10 rounded-lg w-24 mb-3 animate-pulse"></div>
              {[1, 2, 3, 4].map((member) => (
                <div key={member} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded-lg w-24 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded-lg w-16 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded-lg w-20 mb-3 animate-pulse"></div>
              {[1, 2, 3].map((progress) => (
                <div key={progress} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 bg-white/10 rounded-lg w-16 animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded-lg w-8 animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Board Skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((column) => (
              <div
                key={column}
                className="bg-white/5 rounded-xl border border-white/10 p-4"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="h-5 bg-white/10 rounded-lg w-20 animate-pulse"></div>
                  </div>
                  <div className="w-6 h-6 bg-white/10 rounded-full animate-pulse"></div>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  {[1, 2, 3].map((task) => (
                    <div
                      key={task}
                      className="bg-white/10 rounded-lg p-3 space-y-2"
                    >
                      <div className="h-4 bg-white/20 rounded-lg w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-white/20 rounded-lg w-full animate-pulse"></div>
                      <div className="h-3 bg-white/20 rounded-lg w-2/3 animate-pulse"></div>
                      
                      {/* Task Footer */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                          <div className="h-3 bg-white/20 rounded-lg w-16 animate-pulse"></div>
                        </div>
                        <div className="h-5 bg-white/20 rounded-full w-14 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-white/10 rounded-lg w-32 mb-4 animate-pulse"></div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="space-y-4">
            {[1, 2, 3].map((activity) => (
              <div key={activity} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded-lg w-48 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-white/10 rounded-lg w-32 animate-pulse"></div>
                </div>
                <div className="h-3 bg-white/10 rounded-lg w-16 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}