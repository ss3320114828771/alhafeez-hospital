'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)

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

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Handle logout
  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800/95 backdrop-blur-lg border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <i className="fas fa-hospital text-white text-lg"></i>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">Alhafeez</span>
                <span className="text-xs text-gray-400">Hospital</span>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">Dr</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Dr. Ahmed Khan</p>
                <p className="text-gray-400 text-xs truncate">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 px-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                Quick Stats
              </h4>
              <div className="space-y-2">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Projects</span>
                    <span className="text-white font-medium">12</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Tasks</span>
                    <span className="text-white font-medium">28/45</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>v1.0.0</span>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-gray-800/95 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-400 hover:text-white transition"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
                  Dashboard
                </Link>
                {pathname !== '/dashboard' && (
                  <>
                    <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
                    <span className="text-white capitalize">
                      {pathname.split('/').pop()?.replace(/-/g, ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button className="p-2 text-gray-400 hover:text-white transition relative">
                <i className="fas fa-search"></i>
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-white transition relative">
                <i className="fas fa-bell"></i>
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Messages */}
              <button className="p-2 text-gray-400 hover:text-white transition relative">
                <i className="fas fa-envelope"></i>
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Dr</span>
                  </div>
                  <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-white/10 py-1 z-50">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="fas fa-user w-4"></i>
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <i className="fas fa-cog w-4"></i>
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-white/10 my-1"></div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition w-full"
                    >
                      <i className="fas fa-sign-out-alt w-4"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}

// Navigation Items
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'fa-chart-pie', badge: null },
  { href: '/dashboard/projects', label: 'Projects', icon: 'fa-project-diagram', badge: '4' },
  { href: '/dashboard/tasks', label: 'Tasks', icon: 'fa-tasks', badge: '12' },
  { href: '/dashboard/team', label: 'Team', icon: 'fa-users', badge: null },
  { href: '/dashboard/calendar', label: 'Calendar', icon: 'fa-calendar', badge: null },
  { href: '/dashboard/messages', label: 'Messages', icon: 'fa-envelope', badge: '3' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'fa-chart-bar', badge: null },
  { href: '/dashboard/reports', label: 'Reports', icon: 'fa-file-alt', badge: null },
  { href: '/dashboard/settings', label: 'Settings', icon: 'fa-cog', badge: null },
]

// Export for use in other components
export { navItems }