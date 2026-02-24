export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="glass p-8 rounded-3xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse mb-4"></div>
          <div className="h-8 bg-white/20 rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-4 bg-white/20 rounded-lg w-24 mb-2 animate-pulse"></div>
              <div className="h-12 bg-white/20 rounded-lg w-full animate-pulse"></div>
            </div>
          ))}
          
          <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}