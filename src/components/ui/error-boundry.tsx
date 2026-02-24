'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    // In production, you could send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: send to your analytics/error tracking
      // analytics.trackError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return <DefaultErrorUI error={this.state.error} />
    }

    return this.props.children
  }
}

// Default Error UI Component
function DefaultErrorUI({ error }: { error: Error | null }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Error Card */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-red-500/10 p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                <p className="text-gray-400 text-sm">We apologize for the inconvenience</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm font-mono">
                {error?.message || 'An unexpected error occurred'}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition"
              >
                <i className="fas fa-redo mr-2"></i>
                Refresh Page
              </button>

              <Link
                href="/"
                className="block w-full px-4 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition text-center"
              >
                <i className="fas fa-home mr-2"></i>
                Go to Homepage
              </Link>
            </div>

            {/* Technical Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error?.stack && (
              <details className="mt-4">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 bg-gray-900 rounded-lg text-xs text-gray-400 overflow-auto max-h-40">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>

        {/* Support Info */}
        <p className="text-center text-gray-500 text-xs mt-4">
          If this problem persists, please contact our support team
        </p>
      </div>
    </div>
  )
}