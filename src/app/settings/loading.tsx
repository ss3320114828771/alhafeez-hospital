export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-white/10 rounded-lg w-48 mb-2 animate-pulse"></div>
        <div className="h-4 bg-white/10 rounded-lg w-64 animate-pulse"></div>
      </div>

      {/* Settings Navigation Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-10 bg-white/10 rounded-lg w-24 animate-pulse"
          ></div>
        ))}
      </div>

      {/* Settings Content Skeleton */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        {/* Section Title Skeleton */}
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-white/10 rounded-lg mr-3 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-32 animate-pulse"></div>
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-6">
          {/* Text Input Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3].map((field) => (
              <div key={field}>
                <div className="h-4 bg-white/10 rounded-lg w-24 mb-2 animate-pulse"></div>
                <div className="h-12 bg-white/10 rounded-lg w-full animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Grid Fields Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((field) => (
              <div key={field}>
                <div className="h-4 bg-white/10 rounded-lg w-24 mb-2 animate-pulse"></div>
                <div className="h-12 bg-white/10 rounded-lg w-full animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Textarea Skeleton */}
          <div>
            <div className="h-4 bg-white/10 rounded-lg w-24 mb-2 animate-pulse"></div>
            <div className="h-32 bg-white/10 rounded-lg w-full animate-pulse"></div>
          </div>

          {/* Save Button Skeleton */}
          <div className="flex justify-end pt-6 border-t border-white/10">
            <div className="h-12 bg-white/10 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Additional Settings Sections Skeleton */}
      <div className="mt-6 space-y-6">
        {[1, 2, 3].map((section) => (
          <div key={section} className="bg-white/5 rounded-xl border border-white/10 p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-white/10 rounded-lg mr-3 animate-pulse"></div>
              <div className="h-6 bg-white/10 rounded-lg w-40 animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((field) => (
                <div key={field}>
                  <div className="h-4 bg-white/10 rounded-lg w-32 mb-2 animate-pulse"></div>
                  <div className="h-10 bg-white/10 rounded-lg w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}