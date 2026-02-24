'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: number
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fa-chart-pie' },
    { name: 'Projects', href: '/dashboard/projects', icon: 'fa-project-diagram', badge: 4 },
    { name: 'Tasks', href: '/dashboard/tasks', icon: 'fa-tasks', badge: 12 },
    { name: 'Team', href: '/dashboard/team', icon: 'fa-users' },
    { name: 'Calendar', href: '/dashboard/calendar', icon: 'fa-calendar' },
    { name: 'Messages', href: '/dashboard/messages', icon: 'fa-envelope', badge: 3 },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'fa-chart-bar' },
    { name: 'Reports', href: '/dashboard/reports', icon: 'fa-file-alt' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'fa-cog' }
  ]

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-700">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-hospital text-white text-sm"></i>
            </div>
            <span className="text-white font-semibold">Alhafeez</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">AK</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Dr. Ahmed Khan</p>
              <p className="text-gray-400 text-xs">Chief Medical Officer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <i className={`fas ${item.icon} w-5 text-center`}></i>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive(item.href)
                        ? 'bg-white text-blue-600'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={() => {
              document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
              window.location.href = '/login'
            }}
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}