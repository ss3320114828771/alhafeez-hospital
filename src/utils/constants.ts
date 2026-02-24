// ============================================
// HOSPITAL INFORMATION
// ============================================

export const HOSPITAL = {
  NAME: 'Alhafeez Hospital',
  SHORT_NAME: 'Alhafeez',
  SLOGAN: 'Your Health, Our Priority',
  DESCRIPTION: 'Providing quality healthcare with compassion and cutting-edge technology',
  ESTABLISHED: 2000,
  WEBSITE: 'https://alhafeez-hospital.com',
  
  CONTACT: {
    PHONE: '+92 123 456789',
    EMERGENCY: '+92 987 654321',
    EMAIL: 'info@alhafeez.com',
    EMERGENCY_EMAIL: 'emergency@alhafeez.com',
    FAX: '+92 123 456788',
  },
  
  ADDRESS: {
    STREET: 'Amin Pur Banglow',
    AREA: 'Jaranwala Road',
    CITY: 'Faisalabad',
    STATE: 'Punjab',
    COUNTRY: 'Pakistan',
    POSTAL_CODE: '38000',
    FULL: 'Amin Pur Banglow, Jaranwala Road, Faisalabad, Punjab, Pakistan',
  },
  
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/alhafeezhospital',
    TWITTER: 'https://twitter.com/alhafeezhosp',
    INSTAGRAM: 'https://instagram.com/alhafeezhospital',
    LINKEDIN: 'https://linkedin.com/company/alhafeez-hospital',
    YOUTUBE: 'https://youtube.com/alhafeezhospital',
    WHATSAPP: 'https://wa.me/923001234567',
  },
  
  COORDINATES: {
    LAT: 31.4504,
    LNG: 73.1350,
  },
} as const

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  DOCTORS: '/doctors',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },
  
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
    
    PATIENTS: '/dashboard/patients',
    PATIENT_DETAILS: (id: string) => `/dashboard/patients/${id}`,
    
    APPOINTMENTS: '/dashboard/appointments',
    APPOINTMENT_DETAILS: (id: string) => `/dashboard/appointments/${id}`,
    
    DOCTORS: '/dashboard/doctors',
    DOCTOR_DETAILS: (id: string) => `/dashboard/doctors/${id}`,
    
    PROJECTS: '/dashboard/projects',
    PROJECT_DETAILS: (id: string) => `/dashboard/projects/${id}`,
    
    TASKS: '/dashboard/tasks',
    TASK_DETAILS: (id: string) => `/dashboard/tasks/${id}`,
    
    REPORTS: '/dashboard/reports',
    ANALYTICS: '/dashboard/analytics',
    CALENDAR: '/dashboard/calendar',
    MESSAGES: '/dashboard/messages',
    TEAM: '/dashboard/team',
  },
  
  API: {
    AUTH: '/api/auth',
    USERS: '/api/users',
    PATIENTS: '/api/patients',
    DOCTORS: '/api/doctors',
    APPOINTMENTS: '/api/appointments',
    PROJECTS: '/api/projects',
    TASKS: '/api/tasks',
    REPORTS: '/api/reports',
    SETTINGS: '/api/settings',
  },
} as const

// ============================================
// USER ROLES & PERMISSIONS
// ============================================

export const USER_ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  SPECIALIST: 'specialist',
  SURGEON: 'surgeon',
  PHARMACIST: 'pharmacist',
  LAB_TECHNICIAN: 'lab-technician',
  RADIOLOGIST: 'radiologist',
  THERAPIST: 'therapist',
  RECEPTIONIST: 'receptionist',
  BILLING_STAFF: 'billing-staff',
  HR_STAFF: 'hr-staff',
  IT_STAFF: 'it-staff',
  MAINTENANCE: 'maintenance',
  SECURITY: 'security',
  MANAGEMENT: 'management',
  PATIENT: 'patient',
  GUARDIAN: 'guardian',
  RESEARCHER: 'researcher',
  INTERN: 'intern',
  VOLUNTEER: 'volunteer',
  VENDOR: 'vendor',
} as const

export const ROLE_LABELS: Record<keyof typeof USER_ROLES, string> = {
  ADMIN: 'Administrator',
  DOCTOR: 'Doctor',
  NURSE: 'Nurse',
  SPECIALIST: 'Medical Specialist',
  SURGEON: 'Surgeon',
  PHARMACIST: 'Pharmacist',
  LAB_TECHNICIAN: 'Lab Technician',
  RADIOLOGIST: 'Radiologist',
  THERAPIST: 'Therapist',
  RECEPTIONIST: 'Receptionist',
  BILLING_STAFF: 'Billing Staff',
  HR_STAFF: 'HR Staff',
  IT_STAFF: 'IT Staff',
  MAINTENANCE: 'Maintenance Staff',
  SECURITY: 'Security Personnel',
  MANAGEMENT: 'Management',
  PATIENT: 'Patient',
  GUARDIAN: 'Guardian',
  RESEARCHER: 'Researcher',
  INTERN: 'Intern',
  VOLUNTEER: 'Volunteer',
  VENDOR: 'Vendor',
} as const

// ============================================
// DEPARTMENTS
// ============================================

export const DEPARTMENTS = {
  CARDIOLOGY: 'cardiology',
  NEUROLOGY: 'neurology',
  PEDIATRICS: 'pediatrics',
  SURGERY: 'surgery',
  ORTHOPEDICS: 'orthopedics',
  GYNECOLOGY: 'gynecology',
  OPHTHALMOLOGY: 'ophthalmology',
  DERMATOLOGY: 'dermatology',
  PSYCHIATRY: 'psychiatry',
  RADIOLOGY: 'radiology',
  PATHOLOGY: 'pathology',
  PHARMACY: 'pharmacy',
  EMERGENCY: 'emergency',
  ICU: 'icu',
  NICU: 'nicu',
  ADMINISTRATION: 'administration',
  HR: 'hr',
  IT: 'it',
  BILLING: 'billing',
  MAINTENANCE: 'maintenance',
  SECURITY: 'security',
  RESEARCH: 'research',
  EDUCATION: 'education',
} as const

export const DEPARTMENT_LABELS: Record<keyof typeof DEPARTMENTS, string> = {
  CARDIOLOGY: 'Cardiology',
  NEUROLOGY: 'Neurology',
  PEDIATRICS: 'Pediatrics',
  SURGERY: 'Surgery',
  ORTHOPEDICS: 'Orthopedics',
  GYNECOLOGY: 'Gynecology',
  OPHTHALMOLOGY: 'Ophthalmology',
  DERMATOLOGY: 'Dermatology',
  PSYCHIATRY: 'Psychiatry',
  RADIOLOGY: 'Radiology',
  PATHOLOGY: 'Pathology',
  PHARMACY: 'Pharmacy',
  EMERGENCY: 'Emergency',
  ICU: 'ICU',
  NICU: 'NICU',
  ADMINISTRATION: 'Administration',
  HR: 'Human Resources',
  IT: 'IT Department',
  BILLING: 'Billing',
  MAINTENANCE: 'Maintenance',
  SECURITY: 'Security',
  RESEARCH: 'Research',
  EDUCATION: 'Medical Education',
} as const

// ============================================
// APPOINTMENT STATUS & TYPES
// ============================================

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
  RESCHEDULED: 'rescheduled',
} as const

export const APPOINTMENT_TYPES = {
  CONSULTATION: 'consultation',
  FOLLOW_UP: 'follow-up',
  EMERGENCY: 'emergency',
  CHECKUP: 'checkup',
  SURGERY: 'surgery',
  PROCEDURE: 'procedure',
  VACCINATION: 'vaccination',
  TEST: 'test',
} as const

export const APPOINTMENT_STATUS_LABELS: Record<keyof typeof APPOINTMENT_STATUS, string> = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show',
  RESCHEDULED: 'Rescheduled',
} as const

export const APPOINTMENT_TYPE_LABELS: Record<keyof typeof APPOINTMENT_TYPES, string> = {
  CONSULTATION: 'Consultation',
  FOLLOW_UP: 'Follow-up',
  EMERGENCY: 'Emergency',
  CHECKUP: 'Checkup',
  SURGERY: 'Surgery',
  PROCEDURE: 'Medical Procedure',
  VACCINATION: 'Vaccination',
  TEST: 'Medical Test',
} as const

// ============================================
// TASK STATUS & PRIORITY
// ============================================

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done',
  BLOCKED: 'blocked',
  CANCELLED: 'cancelled',
} as const

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const

export const TASK_CATEGORY = {
  PATIENT_CARE: 'patient-care',
  ADMINISTRATIVE: 'administrative',
  CLINICAL: 'clinical',
  SURGICAL: 'surgical',
  EMERGENCY: 'emergency',
  LABORATORY: 'laboratory',
  PHARMACY: 'pharmacy',
  MAINTENANCE: 'maintenance',
  TRAINING: 'training',
  RESEARCH: 'research',
  QUALITY: 'quality',
  COMPLIANCE: 'compliance',
} as const

export const TASK_STATUS_LABELS: Record<keyof typeof TASK_STATUS, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  DONE: 'Done',
  BLOCKED: 'Blocked',
  CANCELLED: 'Cancelled',
} as const

export const TASK_PRIORITY_LABELS: Record<keyof typeof TASK_PRIORITY, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
  CRITICAL: 'Critical',
} as const

export const TASK_PRIORITY_COLORS: Record<keyof typeof TASK_PRIORITY, string> = {
  LOW: 'bg-green-500',
  MEDIUM: 'bg-blue-500',
  HIGH: 'bg-orange-500',
  URGENT: 'bg-red-500',
  CRITICAL: 'bg-purple-500',
} as const

// ============================================
// PROJECT STATUS & PRIORITY
// ============================================

export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ON_HOLD: 'on-hold',
  CANCELLED: 'cancelled',
  PLANNED: 'planned',
} as const

export const PROJECT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  URGENT: 'urgent',
} as const

export const PROJECT_CATEGORY = {
  INFRASTRUCTURE: 'infrastructure',
  IT: 'it',
  MEDICAL: 'medical',
  RESEARCH: 'research',
  TRAINING: 'training',
  QUALITY: 'quality',
  EXPANSION: 'expansion',
  EQUIPMENT: 'equipment',
} as const

// ============================================
// BLOOD GROUPS
// ============================================

export const BLOOD_GROUPS = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
} as const

export const BLOOD_GROUP_LABELS: Record<keyof typeof BLOOD_GROUPS, string> = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
} as const

// ============================================
// GENDER
// ============================================

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  PREFER_NOT_TO_SAY: 'prefer-not-to-say',
} as const

export const GENDER_LABELS: Record<keyof typeof GENDER, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
  PREFER_NOT_TO_SAY: 'Prefer not to say',
} as const

// ============================================
// MARITAL STATUS
// ============================================

export const MARITAL_STATUS = {
  SINGLE: 'single',
  MARRIED: 'married',
  DIVORCED: 'divorced',
  WIDOWED: 'widowed',
  OTHER: 'other',
} as const

export const MARITAL_STATUS_LABELS: Record<keyof typeof MARITAL_STATUS, string> = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  WIDOWED: 'Widowed',
  OTHER: 'Other',
} as const

// ============================================
// EMPLOYMENT TYPES
// ============================================

export const EMPLOYMENT_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  TEMPORARY: 'temporary',
  INTERN: 'intern',
  VOLUNTEER: 'volunteer',
  CONSULTANT: 'consultant',
} as const

export const EMPLOYMENT_TYPE_LABELS: Record<keyof typeof EMPLOYMENT_TYPE, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  TEMPORARY: 'Temporary',
  INTERN: 'Intern',
  VOLUNTEER: 'Volunteer',
  CONSULTANT: 'Consultant',
} as const

// ============================================
// PAYMENT METHODS & STATUS
// ============================================

export const PAYMENT_METHOD = {
  CASH: 'cash',
  CARD: 'card',
  INSURANCE: 'insurance',
  BANK_TRANSFER: 'bank-transfer',
  ONLINE: 'online',
  CHEQUE: 'cheque',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  PARTIALLY_PAID: 'partially-paid',
} as const

export const PAYMENT_METHOD_LABELS: Record<keyof typeof PAYMENT_METHOD, string> = {
  CASH: 'Cash',
  CARD: 'Credit/Debit Card',
  INSURANCE: 'Insurance',
  BANK_TRANSFER: 'Bank Transfer',
  ONLINE: 'Online Payment',
  CHEQUE: 'Cheque',
} as const

export const PAYMENT_STATUS_LABELS: Record<keyof typeof PAYMENT_STATUS, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
  PARTIALLY_PAID: 'Partially Paid',
} as const

// ============================================
// DATE & TIME FORMATS
// ============================================

export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY h:mm A',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  FILE: 'YYYY-MM-DD-HHmmss',
  HUMAN: 'MMMM Do, YYYY',
  HUMAN_WITH_TIME: 'MMMM Do, YYYY [at] h:mm A',
  TIME: 'h:mm A',
  TIME_24H: 'HH:mm',
  DAY_OF_WEEK: 'dddd',
  MONTH_YEAR: 'MMMM YYYY',
} as const

export const TIMEZONE = 'Asia/Karachi'

// ============================================
// PAGINATION
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
  MAX_LIMIT: 100,
} as const

// ============================================
// FILE UPLOAD
// ============================================

export const FILE = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  ALLOWED_ALL_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
} as const

// ============================================
// THEME
// ============================================

export const THEME = {
  COLORS: {
    PRIMARY: '#0ea5e9',
    SECONDARY: '#8b5cf6',
    SUCCESS: '#22c55e',
    DANGER: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6',
    DARK: '#0f172a',
    LIGHT: '#f8fafc',
  },
  GRADIENTS: {
    PRIMARY: 'from-blue-500 to-purple-600',
    SUCCESS: 'from-green-500 to-teal-500',
    DANGER: 'from-red-500 to-pink-500',
    WARNING: 'from-yellow-500 to-orange-500',
    INFO: 'from-cyan-500 to-blue-500',
  },
} as const

// ============================================
// LOCAL STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  THEME: 'alhafeez-theme',
  LANGUAGE: 'alhafeez-language',
  AUTH_TOKEN: 'alhafeez-auth-token',
  USER: 'alhafeez-user',
  PREFERENCES: 'alhafeez-preferences',
  CART: 'alhafeez-cart',
  RECENT_SEARCHES: 'alhafeez-recent-searches',
} as const

// ============================================
// COOKIE KEYS
// ============================================

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  SESSION: 'session',
  LANGUAGE: 'language',
  THEME: 'theme',
} as const

// ============================================
// ANIMATION DURATIONS
// ============================================

export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },
  EASING: {
    LINEAR: 'linear',
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const

// ============================================
// NOTIFICATION TYPES
// ============================================

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const

// ============================================
// REGEX PATTERNS
// ============================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+92|0)?[0-9]{10,13}$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
  MEDIUM_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  NUMBERS_ONLY: /^\d+$/,
  ALPHABETS_ONLY: /^[A-Za-z]+$/,
  ALPHANUMERIC: /^[A-Za-z0-9]+$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  CNIC: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
} as const

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',
  
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
    ACCOUNT_DISABLED: 'Your account has been disabled.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    EMAIL_NOT_VERIFIED: 'Please verify your email address.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    WEAK_PASSWORD: 'Password is too weak. Please use a stronger password.',
  },
  
  FORM: {
    REQUIRED: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    INVALID_URL: 'Please enter a valid URL.',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters.`,
    MAX_LENGTH: (max: number) => `Must be at most ${max} characters.`,
    MIN_VALUE: (min: number) => `Must be at least ${min}.`,
    MAX_VALUE: (max: number) => `Must be at most ${max}.`,
  },
} as const

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  GENERIC: 'Operation completed successfully.',
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  UPDATED: 'Item updated successfully.',
  CREATED: 'Item created successfully.',
  
  AUTH: {
    LOGIN: 'Logged in successfully.',
    LOGOUT: 'Logged out successfully.',
    REGISTER: 'Account created successfully. Please check your email to verify.',
    PASSWORD_CHANGED: 'Password changed successfully.',
    EMAIL_VERIFIED: 'Email verified successfully.',
  },
} as const

// ============================================
// LOADING MESSAGES
// ============================================

export const LOADING_MESSAGES = {
  GENERIC: 'Loading...',
  AUTH: 'Authenticating...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
} as const

// ============================================
// CURRENCY
// ============================================

export const CURRENCY = {
  CODE: 'PKR',
  SYMBOL: '₨',
  NAME: 'Pakistani Rupee',
} as const

// ============================================
// LANGUAGE
// ============================================

export const LANGUAGES = {
  EN: 'en',
  UR: 'ur',
} as const

export const LANGUAGE_LABELS: Record<keyof typeof LANGUAGES, string> = {
  EN: 'English',
  UR: 'Urdu',
} as const

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULTS = {
  LANGUAGE: LANGUAGES.EN,
  THEME: 'dark',
  PAGE_SIZE: 10,
  CURRENCY: CURRENCY.CODE,
  DATE_FORMAT: DATE_FORMATS.DISPLAY,
  TIME_FORMAT: '12h',
} as const