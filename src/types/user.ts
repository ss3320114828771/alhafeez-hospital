// User role types (hospital-specific)
export type UserRole = 
  | 'admin'           // System administrator
  | 'doctor'          // Medical doctor
  | 'nurse'           // Nursing staff
  | 'specialist'      // Medical specialist
  | 'surgeon'         // Surgeon
  | 'pharmacist'      // Pharmacy staff
  | 'lab-technician'  // Laboratory technician
  | 'radiologist'     // Radiology specialist
  | 'therapist'       // Physical/occupational therapist
  | 'receptionist'    // Front desk staff
  | 'billing-staff'   // Billing department
  | 'hr-staff'        // Human resources
  | 'it-staff'        // IT department
  | 'maintenance'     // Facilities maintenance
  | 'security'        // Security personnel
  | 'management'      // Hospital management
  | 'patient'         // Patient (self-service)
  | 'guardian'        // Patient guardian
  | 'researcher'      // Medical researcher
  | 'intern'          // Medical intern
  | 'volunteer'       // Hospital volunteer
  | 'vendor'          // External vendor

// User status
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending' | 'on-leave' | 'terminated'

// User gender
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'

// Blood group
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

// Marital status
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'other'

// Employment type
export type EmploymentType = 
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'temporary'
  | 'intern'
  | 'volunteer'
  | 'consultant'

// Department
export type Department =
  | 'cardiology'
  | 'neurology'
  | 'pediatrics'
  | 'surgery'
  | 'orthopedics'
  | 'gynecology'
  | 'ophthalmology'
  | 'dermatology'
  | 'psychiatry'
  | 'radiology'
  | 'pathology'
  | 'pharmacy'
  | 'emergency'
  | 'icu'
  | 'nicu'
  | 'administration'
  | 'hr'
  | 'it'
  | 'billing'
  | 'maintenance'
  | 'security'
  | 'research'
  | 'education'

// User interface (complete)
export interface User {
  // Core fields
  id: string
  email: string
  username?: string
  password?: string // Only for internal use, never exposed
  
  // Personal information
  fullName: string
  firstName: string
  lastName: string
  middleName?: string
  preferredName?: string
  
  // Professional information
  role: UserRole
  roles?: UserRole[] // Multiple roles if applicable
  title?: string // Dr., Prof., etc.
  specialization?: string[]
  qualification?: string[]
  licenseNumber?: string
  licenseExpiry?: string
  experience?: number // years
  
  // Demographics
  gender: Gender
  dateOfBirth: string
  bloodGroup?: BloodGroup
  maritalStatus?: MaritalStatus
  nationality?: string
  religion?: string
  
  // Contact information
  phone: string
  mobile?: string
  alternativePhone?: string
  emailVerified: boolean
  phoneVerified: boolean
  
  // Address
  address: Address
  permanentAddress?: Address
  
  // Employment
  employeeId?: string
  department: Department | string
  departments?: (Department | string)[] // Multiple departments
  designation: string
  employmentType: EmploymentType
  joinedAt: string
  exitAt?: string
  reportingTo?: string // user id
  subordinates?: string[] // user ids
  
  // Work information
  workSchedule?: WorkSchedule
  workLocation?: string
  shift?: 'morning' | 'evening' | 'night' | 'rotating'
  consultationFee?: number
  
  // Emergency contact
  emergencyContact?: EmergencyContact[]
  
  // Medical information (for patients)
  medicalInfo?: PatientMedicalInfo
  
  // Account information
  status: UserStatus
  lastLogin?: string
  lastActive?: string
  loginAttempts?: number
  lockedUntil?: string
  passwordChangedAt?: string
  emailVerifiedAt?: string
  
  // Permissions
  permissions: string[]
  groups?: string[]
  
  // Profile
  avatar?: string
  bio?: string
  languages?: string[]
  skills?: string[]
  
  // Preferences
  preferences?: UserPreferences
  notifications?: NotificationPreferences
  
  // Social links
  socialLinks?: SocialLinks
  
  // Documents
  documents?: UserDocument[]
  
  // Audit
  createdBy?: string
  createdAt: string
  updatedBy?: string
  updatedAt: string
  deletedAt?: string
  
  // Metadata
  metadata?: Record<string, any>
}

// Address interface
export interface Address {
  street: string
  area?: string
  city: string
  state?: string
  postalCode?: string
  country: string
  latitude?: number
  longitude?: number
  formatted?: string
}

// Emergency contact interface
export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  alternativePhone?: string
  email?: string
  address?: Address
  isPrimary: boolean
  notes?: string
}

// Patient medical information
export interface PatientMedicalInfo {
  bloodGroup?: BloodGroup
  allergies?: string[]
  chronicConditions?: string[]
  currentMedications?: string[]
  pastSurgeries?: string[]
  familyHistory?: string[]
  disabilities?: string[]
  organDonor?: boolean
  advanceDirective?: boolean
  primaryCarePhysician?: string // user id
  insuranceInfo?: InsuranceInfo[]
  emergencyNotes?: string
}

// Insurance information
export interface InsuranceInfo {
  id: string
  provider: string
  policyNumber: string
  groupNumber?: string
  planType: string
  coverageStart: string
  coverageEnd: string
  primaryHolder: string
  relationship: string
  copay?: number
  deductible?: number
  isActive: boolean
}

// Work schedule
export interface WorkSchedule {
  monday?: ShiftTime
  tuesday?: ShiftTime
  wednesday?: ShiftTime
  thursday?: ShiftTime
  friday?: ShiftTime
  saturday?: ShiftTime
  sunday?: ShiftTime
  timezone: string
  exceptions?: ScheduleException[]
}

// Shift time
export interface ShiftTime {
  start: string // HH:MM format
  end: string // HH:MM format
  break?: {
    start: string
    end: string
  }
}

// Schedule exception
export interface ScheduleException {
  id: string
  date: string
  reason: string
  type: 'leave' | 'holiday' | 'training' | 'other'
  approvedBy?: string
  notes?: string
}

// User preferences
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system'
  language?: string
  timezone?: string
  dateFormat?: string
  timeFormat?: '12h' | '24h'
  firstDayOfWeek?: 0 | 1 | 6 // 0=Sunday, 1=Monday, 6=Saturday
  dashboardLayout?: string
  defaultView?: string
  itemsPerPage?: number
  compactMode?: boolean
  highContrast?: boolean
  fontSize?: 'small' | 'medium' | 'large'
}

// Notification preferences
export interface NotificationPreferences {
  email: {
    appointments: boolean
    reminders: boolean
    alerts: boolean
    newsletters: boolean
    billing: boolean
    systemUpdates: boolean
  }
  sms: {
    appointments: boolean
    reminders: boolean
    alerts: boolean
    billing: boolean
  }
  push: {
    appointments: boolean
    reminders: boolean
    alerts: boolean
    messages: boolean
  }
  inApp: {
    messages: boolean
    mentions: boolean
    comments: boolean
    taskAssignments: boolean
    approvals: boolean
  }
}

// Social links
export interface SocialLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  whatsapp?: string
  website?: string
}

// User document
export interface UserDocument {
  id: string
  type: 'id' | 'license' | 'certificate' | 'degree' | 'contract' | 'other'
  name: string
  number?: string
  issuedBy?: string
  issuedDate?: string
  expiryDate?: string
  fileUrl: string
  verified: boolean
  verifiedBy?: string
  verifiedAt?: string
  notes?: string
  uploadedAt: string
}

// User summary (for listings)
export interface UserSummary {
  id: string
  fullName: string
  email: string
  role: UserRole
  department: string
  status: UserStatus
  avatar?: string
  lastActive?: string
}

// User filter
export interface UserFilter {
  roles?: UserRole[]
  departments?: string[]
  status?: UserStatus[]
  employmentType?: EmploymentType[]
  search?: string
  verified?: boolean
  online?: boolean
  dateJoined?: {
    start?: string
    end?: string
  }
  dateOfBirth?: {
    start?: string
    end?: string
  }
  location?: string
  language?: string[]
  skills?: string[]
}

// User sort options
export interface UserSortOptions {
  field: 'fullName' | 'email' | 'role' | 'department' | 'status' | 'lastActive' | 'joinedAt'
  direction: 'asc' | 'desc'
}

// User statistics
export interface UserStatistics {
  total: number
  byRole: Record<UserRole, number>
  byDepartment: Record<string, number>
  byStatus: Record<UserStatus, number>
  byEmploymentType: Record<EmploymentType, number>
  activeToday: number
  activeThisWeek: number
  newThisMonth: number
  leavingSoon: number // users with upcoming exit date
  averageTenure: number // months
  genderDistribution: Record<Gender, number>
}

// User activity log
export interface UserActivity {
  id: string
  userId: string
  action: string
  entityType: string
  entityId?: string
  details?: string
  ipAddress?: string
  userAgent?: string
  timestamp: string
}

// User login history
export interface LoginHistory {
  id: string
  userId: string
  timestamp: string
  ipAddress: string
  userAgent: string
  location?: string
  device?: string
  browser?: string
  os?: string
  successful: boolean
  failureReason?: string
}

// User session
export interface UserSession {
  id: string
  userId: string
  token: string
  ipAddress: string
  userAgent: string
  createdAt: string
  expiresAt: string
  lastActivity: string
  isActive: boolean
}

// User permission
export interface Permission {
  id: string
  name: string
  description: string
  category: string
  roles?: UserRole[]
}

// User group
export interface UserGroup {
  id: string
  name: string
  description: string
  permissions: string[]
  members: string[] // user ids
  createdBy: string
  createdAt: string
  updatedAt: string
}

// User invitation
export interface UserInvitation {
  id: string
  email: string
  role: UserRole
  department?: string
  invitedBy: string
  invitedAt: string
  expiresAt: string
  token: string
  status: 'pending' | 'accepted' | 'expired' | 'cancelled'
  acceptedAt?: string
  notes?: string
}

// Password reset request
export interface PasswordResetRequest {
  id: string
  userId: string
  token: string
  expiresAt: string
  usedAt?: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

// User audit log
export interface UserAudit {
  id: string
  userId: string
  action: 'created' | 'updated' | 'deleted' | 'activated' | 'deactivated' | 'password-changed' | 'role-changed'
  performedBy: string
  performedAt: string
  changes?: {
    field: string
    before: any
    after: any
  }[]
  ipAddress?: string
}

// User feedback
export interface UserFeedback {
  id: string
  userId: string
  type: 'complaint' | 'suggestion' | 'compliment' | 'bug' | 'feature-request'
  subject: string
  message: string
  rating?: number
  status: 'pending' | 'reviewed' | 'resolved' | 'closed'
  response?: string
  respondedBy?: string
  respondedAt?: string
  createdAt: string
  updatedAt: string
}

// User notification
export interface UserNotification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  data?: any
  actionUrl?: string
  createdAt: string
  readAt?: string
}

// User schedule (for doctors/nurses)
export interface UserSchedule {
  id: string
  userId: string
  date: string
  shift: 'morning' | 'evening' | 'night' | 'off'
  startTime: string
  endTime: string
  department: string
  assignedBy: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// User leave request
export interface LeaveRequest {
  id: string
  userId: string
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid'
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  approvedBy?: string
  approvedAt?: string
  comments?: string
  createdAt: string
  updatedAt: string
}

// User performance review
export interface PerformanceReview {
  id: string
  userId: string
  reviewerId: string
  period: string // e.g., "Q1-2024"
  scores: {
    category: string
    score: number // 1-5
    comments?: string
  }[]
  overallScore: number
  strengths: string[]
  improvements: string[]
  goals: string[]
  status: 'draft' | 'submitted' | 'acknowledged' | 'completed'
  submittedAt: string
  acknowledgedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

// User certification
export interface Certification {
  id: string
  userId: string
  name: string
  issuingBody: string
  licenseNumber: string
  issueDate: string
  expiryDate: string
  verified: boolean
  documentUrl?: string
  notes?: string
}

// User skill
export interface Skill {
  id: string
  name: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
  certified?: boolean
}

// User availability
export interface Availability {
  userId: string
  date: string
  slots: {
    start: string
    end: string
    available: boolean
  }[]
}

// User credentials (for authentication)
export interface UserCredentials {
  id: string
  userId: string
  passwordHash: string
  passwordSalt?: string
  mfaSecret?: string
  mfaEnabled: boolean
  backupCodes?: string[]
  lastLogin?: string
  loginAttempts: number
  lockedUntil?: string
  passwordChangedAt: string
  updatedAt: string
}