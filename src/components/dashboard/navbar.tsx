'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          
          <Link href="/dashboard" className="text-white font-semibold">
            Dashboard
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications Icon */}
          <button className="text-gray-400 hover:text-white relative">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Messages Icon */}
          <button className="text-gray-400 hover:text-white relative">
            <i className="fas fa-envelope text-lg"></i>
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 text-white"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">AK</span>
              </div>
              <span className="hidden md:block">Dr. Ahmed</span>
              <i className="fas fa-chevron-down text-xs text-gray-400"></i>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-1">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  onClick={() => setShowDropdown(false)}
                >
                  <i className="fas fa-user mr-2 w-4"></i>
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  onClick={() => setShowDropdown(false)}
                >
                  <i className="fas fa-cog mr-2 w-4"></i>
                  Settings
                </Link>
                <hr className="border-gray-600 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                >
                  <i className="fas fa-sign-out-alt mr-2 w-4"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}