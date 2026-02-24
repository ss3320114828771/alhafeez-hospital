export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section Skeleton */}
      <section className="relative h-[50vh] bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Content Skeleton */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center max-w-3xl">
            {/* Title Skeleton */}
            <div className="space-y-4">
              <div className="h-16 bg-white/10 rounded-lg w-96 mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/10 rounded-lg w-64 mx-auto animate-pulse"></div>
            </div>

            {/* Breadcrumb Skeleton */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
              <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
              <div className="h-4 bg-white/10 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgba(17,24,39,0.5)"></path>
          </svg>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-6 py-20">
        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[1, 2, 3, 4].map((stat) => (
            <div key={stat} className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4 animate-pulse"></div>
              <div className="h-8 bg-white/10 rounded w-20 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-24 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Mission & Vision Section Skeleton */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Mission Card */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-8 h-8 bg-white/10 rounded"></div>
            </div>
            <div className="h-8 bg-white/10 rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-8 h-8 bg-white/10 rounded"></div>
            </div>
            <div className="h-8 bg-white/10 rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Timeline Section Skeleton */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="h-10 bg-white/10 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((item, index) => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-white/10 rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-white/10 rounded w-48 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-96 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section Skeleton */}
        <div>
          <div className="text-center mb-12">
            <div className="h-10 bg-white/10 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-white/10 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-24 mx-auto mb-3 animate-pulse"></div>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}