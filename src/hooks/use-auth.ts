'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  fullName: string
  email: string
  role: 'admin' | 'doctor' | 'nurse' | 'staff' | 'patient'
  department?: string
  avatar?: string
  permissions: string[]
}

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterData {
  fullName: string
  email: string
  password: string
  phone: string
  role?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  })
  const router = useRouter()

  // Load user on mount
  useEffect(() => {
    loadUser()
  }, [])

  // Load user from token
  const loadUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setState({
          user: data.user,
          isLoading: false,
          error: null
        })
      } else {
        setState({
          user: null,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: 'Failed to load user'
      })
    }
  }, [])

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      setState({
        user: data.user,
        isLoading: false,
        error: null
      })

      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }))
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
    }
  }, [router])

  // Register
  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      setState({
        user: result.user,
        isLoading: false,
        error: null
      })

      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }))
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' }
    }
  }, [router])

  // Logout
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include'
      })

      setState({
        user: null,
        isLoading: false,
        error: null
      })

      router.push('/login')
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false
      }))
    }
  }, [router])

  // Update profile
  const updateProfile = useCallback(async (data: Partial<User>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile')
      }

      setState(prev => ({
        ...prev,
        user: result.user,
        isLoading: false,
        error: null
      }))

      return { success: true }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      }))
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update profile' }
    }
  }, [])

  // Change password
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to change password')
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }))

      return { success: true }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to change password'
      }))
      return { success: false, error: error instanceof Error ? error.message : 'Failed to change password' }
    }
  }, [])

  // Check if user has permission
  const hasPermission = useCallback((permission: string) => {
    if (!state.user) return false
    return state.user.permissions.includes('all') || state.user.permissions.includes(permission)
  }, [state.user])

  // Check if user has role
  const hasRole = useCallback((roles: string | string[]) => {
    if (!state.user) return false
    const roleList = Array.isArray(roles) ? roles : [roles]
    return roleList.includes(state.user.role)
  }, [state.user])

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: !!state.user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    hasPermission,
    hasRole
  }
}