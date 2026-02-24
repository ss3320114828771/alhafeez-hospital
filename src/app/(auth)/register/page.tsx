'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setLoading(false)
    }
  }, [])

  // Check password strength
  useEffect(() => {
    let strength = 0
    const password = formData.password
    
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]+/)) strength += 25
    if (password.match(/[A-Z]+/)) strength += 25
    if (password.match(/[0-9]+/)) strength += 25
    if (password.match(/[$@#&!]+/)) strength += 25
    
    setPasswordStrength(Math.min(strength, 100))
  }, [formData.password])

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: ''
    }

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
      isValid = false
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters'
      isValid = false
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
      isValid = false
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      isValid = false
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password is too weak'
      isValid = false
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Set auth cookie
      document.cookie = 'auth-token=logged-in; path=/; max-age=86400'
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Get password strength color
  const getStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500'
    if (passwordStrength < 60) return 'bg-yellow-500'
    if (passwordStrength < 80) return 'bg-blue-500'
    return 'bg-green-500'
  }

  // Get password strength text
  const getStrengthText = () => {
    if (passwordStrength < 30) return 'Weak'
    if (passwordStrength < 60) return 'Fair'
    if (passwordStrength < 80) return 'Good'
    return 'Strong'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles - Fixed with inline styles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '4s' }}
        ></div>
        
        {/* Floating Particles - Using inline styles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-green-500/25">
                <i className="fas fa-hospital text-white text-3xl"></i>
              </div>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>
            <p className="text-gray-300 text-sm">
              Join Alhafeez Hospital for better healthcare
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400 text-sm"></i>
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'
                  } rounded-xl focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300`}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400 text-sm"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } rounded-xl focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-400 text-sm"></i>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${
                    errors.phone ? 'border-red-500' : 'border-white/20'
                  } rounded-xl focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300`}
                  placeholder="Enter your phone number"
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400 text-sm"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 bg-white/5 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } rounded-xl focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300`}
                  placeholder="Create a password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2 min-w-[40px]">
                      {getStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Use 8+ chars with uppercase, lowercase & numbers
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400 text-sm"></i>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 bg-white/5 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                  } rounded-xl focus:outline-none focus:border-green-500 text-white placeholder-gray-500 transition-all duration-300`}
                  placeholder="Confirm your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-green-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  disabled={loading}
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-400 hover:text-green-300 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-400 hover:text-green-300 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none relative overflow-hidden group mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
            </div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'fab fa-google', color: 'hover:bg-red-500/20' },
              { icon: 'fab fa-facebook-f', color: 'hover:bg-blue-600/20' },
              { icon: 'fab fa-twitter', color: 'hover:bg-blue-400/20' }
            ].map((social, index) => (
              <button
                key={index}
                type="button"
                disabled={loading}
                className="py-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50 group"
              >
                <i className={`${social.icon} text-gray-300 group-hover:text-white transition-colors`}></i>
              </button>
            ))}
          </div>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-green-400 hover:text-green-300 font-medium transition-colors hover:underline"
            >
              Sign in here
            </Link>
          </p>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
            >
              <i className="fas fa-arrow-left mr-2 text-xs group-hover:-translate-x-1 transition-transform"></i>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Features Strip */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: 'fa-shield-alt', text: 'Secure' },
            { icon: 'fa-lock', text: 'Encrypted' },
            { icon: 'fa-clock', text: 'Quick Setup' }
          ].map((feature, index) => (
            <div key={index} className="text-xs text-gray-400">
              <i className={`fas ${feature.icon} text-green-400 mb-1`}></i>
              <p className="hidden sm:block">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}