import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Types
interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterRequest {
  fullName: string
  email: string
  phone: string
  password: string
  role?: string
}

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  role: 'admin' | 'doctor' | 'nurse' | 'staff'
  avatar?: string
  permissions: string[]
}

// Mock users database (in real app, this would be a real database)
const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'Dr. Ahmed Khan',
    email: 'ahmed@alhafeez.com',
    phone: '+92300123456',
    role: 'admin',
    permissions: ['all']
  },
  {
    id: '2',
    fullName: 'Dr. Fatima Ali',
    email: 'fatima@alhafeez.com',
    phone: '+92300765432',
    role: 'doctor',
    permissions: ['view_patients', 'create_prescriptions']
  }
]

// Helper function to generate token
const generateToken = (userId: string): string => {
  // In production, use proper JWT signing
  return Buffer.from(`${userId}-${Date.now()}`).toString('base64')
}

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to validate phone (Pakistan format)
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+92|0)?[0-9]{10,13}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Helper function to create response with cookie
const createAuthResponse = (user: User, rememberMe: boolean = false) => {
  const token = generateToken(user.id)
  
  // Set cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day
  }

  // Create response
  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    }
  })

  // Set cookie
  response.cookies.set('auth-token', token, cookieOptions)
  
  return response
}

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LoginRequest
    const { email, password, rememberMe } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and password are required' 
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // Simulate database lookup
    const user = mockUsers.find(u => u.email === email)

    // In production, you would verify password hash
    // For demo, accept any password for mock users
    if (!user || password.length < 6) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid credentials' 
        },
        { status: 401 }
      )
    }

    // Create response with cookie
    return createAuthResponse(user, rememberMe)

  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/auth/register
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as RegisterRequest
    const { fullName, email, phone, password, role = 'patient' } = body

    // Validate input
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400 }
      )
    }

    if (fullName.length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name must be at least 3 characters' 
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid phone number format' 
        },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Password must be at least 8 characters' 
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User already exists' 
        },
        { status: 409 }
      )
    }

    // Create new user (in production, save to database)
    const newUser: User = {
      id: String(mockUsers.length + 1),
      fullName,
      email,
      phone,
      role: role as any,
      permissions: role === 'admin' ? ['all'] : ['view_basic']
    }

    // In production, you would:
    // 1. Hash the password
    // 2. Save to database
    // 3. Send verification email

    // Mock: Add to array (in production, this would be a database insert)
    mockUsers.push(newUser)

    // Create response with cookie
    return createAuthResponse(newUser, false)

  } catch (error) {
    console.error('Registration error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// GET /api/auth/me
export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not authenticated' 
        },
        { status: 401 }
      )
    }

    // Decode token (in production, verify JWT)
    const userId = Buffer.from(token, 'base64').toString().split('-')[0]

    // Find user
    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    })

  } catch (error) {
    console.error('Auth check error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/auth/logout
export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Clear auth cookie
    response.cookies.delete('auth-token')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// PATCH /api/auth/change-password
export async function PATCH(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()

    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not authenticated' 
        },
        { status: 401 }
      )
    }

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Current password and new password are required' 
        },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'New password must be at least 8 characters' 
        },
        { status: 400 }
      )
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'New password must be different from current password' 
        },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Verify current password
    // 2. Hash new password
    // 3. Update in database

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Password change error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// OPTIONS /api/auth (for CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}