'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* 404 Text - Fixed gradient animation */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 relative">
          <span className="absolute inset-0 text-blue-500/20 blur-2xl animate-pulse">404</span>
          <span className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            404
          </span>
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-home mr-2 group-hover:animate-bounce inline-block"></i>
            Back to Home
          </Link>
          
          <Link
            href="/contact"
            className="group px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-headset mr-2 group-hover:animate-pulse"></i>
            Contact Support
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { href: '/', icon: 'fa-home', text: 'Home', color: 'from-blue-500 to-blue-600' },
            { href: '/about', icon: 'fa-info-circle', text: 'About', color: 'from-purple-500 to-purple-600' },
            { href: '/services', icon: 'fa-stethoscope', text: 'Services', color: 'from-green-500 to-green-600' },
            { href: '/contact', icon: 'fa-envelope', text: 'Contact', color: 'from-pink-500 to-pink-600' }
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group relative overflow-hidden rounded-xl p-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${link.color}`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <i className={`fas ${link.icon} text-2xl text-blue-400 group-hover:text-white mb-2 transition-all duration-300 group-hover:scale-110 inline-block`}></i>
                <p className="text-white font-medium">{link.text}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-2">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 bg-blue-500/50 rounded-full animate-pulse"
              style={{ animationDelay: `${dot * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}