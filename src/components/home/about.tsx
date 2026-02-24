'use client'

import Link from 'next/link'

export default function About() {
  const features = [
    {
      icon: 'fa-microscope',
      title: 'Modern Equipment',
      description: 'State-of-the-art medical equipment for accurate diagnosis and treatment.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'fa-user-md',
      title: 'Expert Doctors',
      description: 'Highly qualified doctors dedicated to your health and well-being.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'fa-heartbeat',
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency services with rapid response teams.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: 'fa-flask',
      title: 'Advanced Lab',
      description: 'Fully equipped laboratory for comprehensive diagnostic testing.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { value: '25+', label: 'Years Experience', icon: 'fa-calendar' },
    { value: '50K+', label: 'Happy Patients', icon: 'fa-smile' },
    { value: '200+', label: 'Expert Doctors', icon: 'fa-user-md' },
    { value: '15+', label: 'Departments', icon: 'fa-building' }
  ]

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Alhafeez Hospital
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Providing compassionate healthcare with cutting-edge technology since 2000
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Text */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Excellence in Healthcare
            </h3>
            <p className="text-gray-400 mb-6">
              Alhafeez Hospital has been at the forefront of medical innovation in Faisalabad for over two decades. We combine modern medical technology with compassionate care to provide the best healthcare experience for our patients.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <i className="fas fa-check text-green-500 text-xs"></i>
                </div>
                <p className="text-gray-300">Joint Commission International accredited</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <i className="fas fa-check text-green-500 text-xs"></i>
                </div>
                <p className="text-gray-300">State-of-the-art infrastructure and equipment</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <i className="fas fa-check text-green-500 text-xs"></i>
                </div>
                <p className="text-gray-300">24/7 emergency and trauma care</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <i className="fas fa-check text-green-500 text-xs"></i>
                </div>
                <p className="text-gray-300">Affordable healthcare for everyone</p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition"
            >
              Learn More About Us
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/hospital-building.jpg"
                alt="Alhafeez Hospital"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-star text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-white font-bold">25+ Years</p>
                  <p className="text-gray-400 text-sm">of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${stat.icon} text-blue-500 text-xl`}></i>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <i className={`fas ${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}