export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="glass p-12 rounded-3xl text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse mb-6">
          <i className="fas fa-hospital text-white text-3xl"></i>
        </div>
        
        <div className="loader mx-auto mb-4"></div>
        <p className="text-gray-300">Loading authentication...</p>
      </div>
    </div>
  )
}