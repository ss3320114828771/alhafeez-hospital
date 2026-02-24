'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-6">
      <div className="glass p-12 rounded-3xl max-w-2xl w-full text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <i className="fas fa-exclamation-triangle text-white text-4xl"></i>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>
        
        <p className="text-gray-300 mb-8">
          We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-8 py-4 glass text-white rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105"
          >
            <i className="fas fa-home mr-2"></i>
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-black/50 rounded-lg text-left">
            <p className="text-red-400 font-mono text-sm">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}