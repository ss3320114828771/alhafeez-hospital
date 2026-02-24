'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface DropdownItem {
  label: string
  value: string
  icon?: string
  color?: 'default' | 'red' | 'green' | 'blue'
  divider?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  onSelect?: (item: DropdownItem) => void
  placement?: 'left' | 'right'
  width?: 'auto' | 'sm' | 'md' | 'lg'
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  onSelect,
  placement = 'left',
  width = 'auto',
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Width classes
  const widths = {
    auto: 'w-auto',
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  }

  // Item colors
  const itemColors = {
    default: 'text-gray-300 hover:bg-gray-700 hover:text-white',
    red: 'text-red-400 hover:bg-red-500/20 hover:text-red-300',
    green: 'text-green-400 hover:bg-green-500/20 hover:text-green-300',
    blue: 'text-blue-400 hover:bg-blue-500/20 hover:text-blue-300'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle item click
  const handleItemClick = (item: DropdownItem) => {
    onSelect?.(item)
    setIsOpen(false)
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 ${widths[width]}
            ${placement === 'right' ? 'right-0' : 'left-0'}
            bg-gray-800 rounded-lg shadow-xl border border-gray-700
            overflow-hidden
          `}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className="my-1 border-t border-gray-700"></div>
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full px-4 py-2.5 text-sm flex items-center space-x-3
                      transition-colors duration-150
                      ${itemColors[item.color || 'default']}
                    `}
                  >
                    {item.icon && (
                      <i className={`fas ${item.icon} w-4 text-center`}></i>
                    )}
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}