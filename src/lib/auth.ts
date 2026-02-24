import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

// Types
export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  role: 'admin' | 'doctor' | 'nurse' | 'staff' | 'patient'
  department?: string
  specialization?: string
  avatar?: string
  permissions: string[]
  createdAt: string
  lastLogin?: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
  phone: string
  role?: string
  department?: string
}

// Mock users database (in production, this would be a real database)
const users: User[] = [
  {
    id: '1',
    fullName: 'Dr. Ahmed Khan',
    email: 'ahmed@alhafeez.com',
    phone: '+923001234567',
    role: 'admin',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    permissions: ['all'],
    createdAt: '2020-01-15T00:00:00Z',
    lastLogin: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    fullName: 'Dr. Fatima Ali',
    email: 'fatima@alhafeez.com',
    phone: '+923007654321',
    role: 'doctor',
    department: 'Neurology',
    specialization: 'Neurological Surgery',
    permissions: ['view_patients', 'create_prescriptions', 'view_reports'],
    createdAt: '2021-03-10T00:00:00Z',
    lastLogin: '2024-03-15T09:15:00Z'
  },
  {
    id: '3',
    fullName: 'Nurse Sara',
    email: 'sara@alhafeez.com',
    phone: '+923001112233',
    role: 'nurse',
    department: 'ICU',
    permissions: ['view_patients', 'update_vitals', 'view_schedule'],
    createdAt: '2022-06-20T00:00:00Z',
    lastLogin: '2024-03-15T08:45:00Z'
  }
]

// Session store (in production, use Redis or similar)
const sessions = new Map<string, Session>()

// Token expiration times
const TOKEN_EXPIRY = {
  short: 24 * 60 * 60 * 1000, // 24 hours
  long: 30 * 24 * 60 * 60 * 1000 // 30 days
}

// Helper: Generate JWT-like token
export function generateToken(userId: string, rememberMe: boolean = false): string {
  const expiresAt = Date.now() + (rememberMe ? TOKEN_EXPIRY.long : TOKEN_EXPIRY.short)
  const payload = {
    userId,
    exp: expiresAt,
    iat: Date.now()
  }
  
  // In production, use proper JWT signing with a secret key
  // For now, we'll use a simple base64 encoding
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

// Helper: Verify and decode token
export function verifyToken(token: string): { userId: string; exp: number } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null
    }
    
    return {
      userId: decoded.userId,
      exp: decoded.exp
    }
  } catch {
    return null
  }
}

// Helper: Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper: Validate phone number (Pakistan format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+92|0)?[0-9]{10,13}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Helper: Validate password strength
export function validatePassword(password: string): { 
  valid: boolean; 
  score: number; 
  message: string 
} {
  let score = 0
  const messages: string[] = []

  // Length check
  if (password.length >= 8) {
    score += 25
  } else {
    messages.push('at least 8 characters')
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 25
  } else {
    messages.push('an uppercase letter')
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 25
  } else {
    messages.push('a lowercase letter')
  }

  // Number check
  if (/[0-9]/.test(password)) {
    score += 25
  } else {
    messages.push('a number')
  }

  // Special character check (bonus)
  if (/[!@#$%^&*]/.test(password)) {
    score = Math.min(score + 10, 100)
  }

  const message = messages.length > 0 
    ? `Password must contain ${messages.join(', ')}`
    : 'Password is strong'

  return { valid: score >= 75, score, message }
}

// Helper: Hash password (mock - in production use bcrypt)
export async function hashPassword(password: string): Promise<string> {
  // In production: return await bcrypt.hash(password, 10)
  return `hashed_${password}_${Date.now()}`
}

// Helper: Compare password (mock - in production use bcrypt)
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // In production: return await bcrypt.compare(password, hash)
  return hash === `hashed_${password}_` + hash.split('_').pop()
}

// Login function
export async function login(credentials: LoginCredentials): Promise<{
  success: boolean
  user?: User
  token?: string
  error?: string
}> {
  try {
    const { email, password, rememberMe = false } = credentials

    // Validate input
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' }
    }

    // Find user
    const user = users.find(u => u.email === email)
    
    // In production, verify password hash
    if (!user || password.length < 6) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Generate token
    const token = generateToken(user.id, rememberMe)

    // Create session
    const session: Session = {
      user,
      token,
      expiresAt: new Date(Date.now() + (rememberMe ? TOKEN_EXPIRY.long : TOKEN_EXPIRY.short)).toISOString()
    }
    
    sessions.set(token, session)

    // Update last login
    user.lastLogin = new Date().toISOString()

    return {
      success: true,
      user,
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Login failed' }
  }
}

// Register function
export async function register(data: RegisterData): Promise<{
  success: boolean
  user?: User
  token?: string
  error?: string
}> {
  try {
    const { fullName, email, password, phone, role = 'patient', department } = data

    // Validate input
    if (!fullName || !email || !password || !phone) {
      return { success: false, error: 'All fields are required' }
    }

    if (fullName.length < 3) {
      return { success: false, error: 'Name must be at least 3 characters' }
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' }
    }

    if (!isValidPhone(phone)) {
      return { success: false, error: 'Invalid phone number format' }
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message }
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return { success: false, error: 'User already exists' }
    }

    // Create new user
    const newUser: User = {
      id: String(users.length + 1),
      fullName,
      email,
      phone,
      role: role as any,
      department,
      permissions: role === 'admin' ? ['all'] : getDefaultPermissions(role),
      createdAt: new Date().toISOString()
    }

    // In production, save to database
    users.push(newUser)

    // Generate token
    const token = generateToken(newUser.id)

    // Create session
    const session: Session = {
      user: newUser,
      token,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY.short).toISOString()
    }
    
    sessions.set(token, session)

    return {
      success: true,
      user: newUser,
      token
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Registration failed' }
  }
}

// Get default permissions based on role
function getDefaultPermissions(role: string): string[] {
  const permissions: Record<string, string[]> = {
    doctor: ['view_patients', 'create_prescriptions', 'view_reports', 'update_records'],
    nurse: ['view_patients', 'update_vitals', 'view_schedule', 'administer_medication'],
    staff: ['view_schedule', 'manage_appointments', 'view_basic_info'],
    patient: ['view_own_records', 'book_appointments', 'view_bills']
  }
  
  return permissions[role] || ['view_basic']
}

// Get session by token
export function getSession(token: string): Session | null {
  // Verify token
  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  // Get session
  const session = sessions.get(token)
  if (!session) {
    return null
  }

  return session
}

// Get user by ID
export function getUserById(userId: string): User | undefined {
  return users.find(u => u.id === userId)
}

// Get user by email
export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email)
}

// Logout function
export async function logout(token: string): Promise<boolean> {
  // Remove session
  return sessions.delete(token)
}

// Refresh token
export async function refreshToken(oldToken: string): Promise<string | null> {
  const session = sessions.get(oldToken)
  if (!session) {
    return null
  }

  // Generate new token
  const newToken = generateToken(session.user.id)
  
  // Create new session
  const newSession: Session = {
    ...session,
    token: newToken,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRY.short).toISOString()
  }

  // Remove old session and add new
  sessions.delete(oldToken)
  sessions.set(newToken, newSession)

  return newToken
}

// Get session from request
export function getSessionFromRequest(request: NextRequest): Session | null {
  const token = request.cookies.get('auth-token')?.value
  if (!token) {
    return null
  }

  return getSession(token)
}

// Check if user has permission
export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes('all') || user.permissions.includes(permission)
}

// Check if user has role
export function hasRole(user: User, roles: string | string[]): boolean {
  const roleList = Array.isArray(roles) ? roles : [roles]
  return roleList.includes(user.role)
}

// Get all users (admin only)
export function getAllUsers(): User[] {
  return users
}

// Update user
export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  const index = users.findIndex(u => u.id === userId)
  if (index === -1) {
    return null
  }

  users[index] = { ...users[index], ...updates }
  return users[index]
}

// Delete user
export async function deleteUser(userId: string): Promise<boolean> {
  const index = users.findIndex(u => u.id === userId)
  if (index === -1) {
    return false
  }

  users.splice(index, 1)
  
  // Remove all sessions for this user
  for (const [token, session] of sessions.entries()) {
    if (session.user.id === userId) {
      sessions.delete(token)
    }
  }

  return true
}

// Change password
export async function changePassword(
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = users.find(u => u.id === userId)
  if (!user) {
    return { success: false, error: 'User not found' }
  }

  // In production, verify current password
  // For now, just validate new password
  const validation = validatePassword(newPassword)
  if (!validation.valid) {
    return { success: false, error: validation.message }
  }

  return { success: true }
}

// Get active sessions count
export function getActiveSessionsCount(): number {
  let count = 0
  for (const session of sessions.values()) {
    if (new Date(session.expiresAt) > new Date()) {
      count++
    }
  }
  return count
}

// Clean expired sessions
export function cleanExpiredSessions(): number {
  let cleaned = 0
  for (const [token, session] of sessions.entries()) {
    if (new Date(session.expiresAt) <= new Date()) {
      sessions.delete(token)
      cleaned++
    }
  }
  return cleaned
}