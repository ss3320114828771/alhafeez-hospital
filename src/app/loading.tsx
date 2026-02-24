export default function RootLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
            <i className="fas fa-hospital text-white text-4xl animate-bounce"></i>
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-ping"></div>
        </div>

        {/* Loading Spinner - Using Tailwind animate-spin */}
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">Loading Alhafeez Hospital</h2>
        <p className="text-gray-300">Please wait while we prepare your experience...</p>

        {/* Progress Bar - Using Tailwind animate-pulse */}
        <div className="w-64 h-2 bg-white/20 rounded-full mt-6 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}