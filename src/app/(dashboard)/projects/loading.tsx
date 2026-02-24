export default function ProjectsLoading() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-white/10 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded-lg w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-white/10 rounded-lg w-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-white/10 rounded-lg animate-pulse"></div>
              <div className="h-3 bg-white/10 rounded-lg w-5/6 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}