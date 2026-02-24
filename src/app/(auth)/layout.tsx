'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Handle mounting to avoid hydration errors
  useEffect(() => {
    setMounted(true)
    
    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Determine current page for active states
  const isLoginPage = pathname === '/login'
  const isRegisterPage = pathname === '/register'

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Simple Header */}
      <header className="py-4 px-6 border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <i className="fas fa-hospital text-white text-sm"></i>
              </div>
              <span className="text-lg font-semibold text-white">Alhafeez</span>
            </Link>

            {/* Auth Nav */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  isLoginPage 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  isRegisterPage 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Decorative Card */}
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20"></div>
            
            {/* Content Card */}
            <div className="relative bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-1">
              {children}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Secure authentication powered by Alhafeez Hospital
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <Link href="/" className="hover:text-gray-300 transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span>© 2024 Alhafeez Hospital</span>
              {currentTime && (
                <span className="flex items-center">
                  <i className="fas fa-clock mr-1 text-blue-400 text-xs"></i>
                  {currentTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}