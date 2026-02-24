'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  icon?: string
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan'
  variant?: 'default' | 'gradient' | 'outline' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  hoverable?: boolean
  footer?: ReactNode
  headerAction?: ReactNode
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  iconColor = 'blue',
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hoverable = false,
  footer,
  headerAction
}: CardProps) {
  // Variant styles
  const variants = {
    default: 'bg-gray-800 border border-gray-700',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700',
    outline: 'bg-transparent border border-gray-700',
    glass: 'bg-white/5 backdrop-blur-sm border border-white/10'
  }

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  }

  // Icon colors
  const iconColors = {
    blue: 'bg-blue-500/20 text-blue-500',
    green: 'bg-green-500/20 text-green-500',
    purple: 'bg-purple-500/20 text-purple-500',
    orange: 'bg-orange-500/20 text-orange-500',
    red: 'bg-red-500/20 text-red-500',
    cyan: 'bg-cyan-500/20 text-cyan-500'
  }

  return (
    <div
      className={`
        rounded-xl transition-all duration-200
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverable ? 'hover:shadow-lg hover:scale-[1.02] hover:border-gray-600 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header with Title and Action */}
      {(title || icon || headerAction) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            {icon && (
              <div className={`w-10 h-10 ${iconColors[iconColor]} rounded-xl flex items-center justify-center`}>
                <i className={`fas ${icon} text-lg`}></i>
              </div>
            )}

            {/* Title and Subtitle */}
            <div>
              {title && <h3 className="text-white font-semibold">{title}</h3>}
              {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
            </div>
          </div>

          {/* Header Action */}
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={title || icon ? '' : ''}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          {footer}
        </div>
      )}
    </div>
  )
}