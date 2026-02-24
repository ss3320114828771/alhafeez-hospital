'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  helper?: string
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = 'left',
      helper,
      required,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base input classes
    const baseClasses = 'w-full bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition'
    
    // Size classes
    const sizeClasses = 'px-4 py-3'
    
    // Icon padding classes
    const iconPaddingClasses = icon
      ? iconPosition === 'left'
        ? 'pl-11 pr-4'
        : 'pl-4 pr-11'
      : ''
    
    // State classes
    const stateClasses = error
      ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
      : disabled
      ? 'border-gray-600 opacity-50 cursor-not-allowed'
      : 'border-gray-600 focus:ring-blue-500/50 focus:border-blue-500'
    
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className={`fas ${icon}`}></i>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={`
              ${baseClasses}
              ${sizeClasses}
              ${iconPaddingClasses}
              ${stateClasses}
              ${className}
            `}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : helper ? `${props.id}-helper` : undefined}
            {...props}
          />

          {/* Right Icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className={`fas ${icon}`}></i>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p id={`${props.id}-error`} className="mt-2 text-sm text-red-400 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helper && !error && (
          <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-500">
            {helper}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input