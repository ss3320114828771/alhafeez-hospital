// Types
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'staff' | 'patient'

export type Permission = 
  | 'all' // Super admin access
  // Patient permissions
  | 'view_patients'
  | 'create_patient'
  | 'update_patient'
  | 'delete_patient'
  | 'view_patient_history'
  // Medical records permissions
  | 'view_medical_records'
  | 'create_medical_records'
  | 'update_medical_records'
  | 'delete_medical_records'
  // Appointment permissions
  | 'view_appointments'
  | 'create_appointment'
  | 'update_appointment'
  | 'cancel_appointment'
  | 'approve_appointment'
  // Prescription permissions
  | 'view_prescriptions'
  | 'create_prescription'
  | 'update_prescription'
  | 'delete_prescription'
  // Lab test permissions
  | 'view_lab_tests'
  | 'order_lab_test'
  | 'update_lab_test'
  | 'view_lab_results'
  // Billing permissions
  | 'view_invoices'
  | 'create_invoice'
  | 'process_payment'
  | 'refund_payment'
  // Staff permissions
  | 'view_staff'
  | 'manage_staff'
  | 'view_schedules'
  | 'manage_schedules'
  // Department permissions
  | 'view_departments'
  | 'manage_departments'
  | 'view_bed_occupancy'
  | 'manage_beds'
  // Report permissions
  | 'view_reports'
  | 'generate_reports'
  | 'export_data'
  // System permissions
  | 'view_settings'
  | 'manage_settings'
  | 'view_audit_logs'
  | 'manage_permissions'

export interface RolePermissions {
  role: UserRole
  permissions: Permission[]
  description: string
}

export interface User {
  id: string
  role: UserRole
  permissions?: Permission[]
  department?: string
}

// Role-based permission definitions
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ['all'], // Admin has all permissions

  doctor: [
    // Patient permissions
    'view_patients',
    'create_patient',
    'update_patient',
    'view_patient_history',
    
    // Medical records
    'view_medical_records',
    'create_medical_records',
    'update_medical_records',
    
    // Appointments
    'view_appointments',
    'create_appointment',
    'update_appointment',
    'approve_appointment',
    
    // Prescriptions
    'view_prescriptions',
    'create_prescription',
    'update_prescription',
    
    // Lab tests
    'view_lab_tests',
    'order_lab_test',
    'view_lab_results',
    
    // Reports
    'view_reports',
    
    // Other
    'view_schedules'
  ],

  nurse: [
    // Patient permissions
    'view_patients',
    'update_patient',
    'view_patient_history',
    
    // Medical records
    'view_medical_records',
    'create_medical_records',
    
    // Appointments
    'view_appointments',
    'update_appointment',
    
    // Lab tests
    'view_lab_tests',
    'update_lab_test',
    'view_lab_results',
    
    // Other
    'view_schedules',
    'view_bed_occupancy'
  ],

  staff: [
    // Patient permissions
    'view_patients',
    
    // Appointments
    'view_appointments',
    'create_appointment',
    'update_appointment',
    'cancel_appointment',
    
    // Billing
    'view_invoices',
    'create_invoice',
    'process_payment',
    
    // Reports
    'view_reports',
    
    // Other
    'view_schedules',
    'view_departments'
  ],

  patient: [
    // Self-service permissions
    'view_appointments',
    'create_appointment',
    'cancel_appointment',
    'view_prescriptions',
    'view_lab_results',
    'view_invoices'
  ]
}

// Permission descriptions for UI - FIXED: Added all missing permissions
export const permissionDescriptions: Record<Permission, string> = {
  // Super admin
  all: 'Full system access',
  
  // Patient permissions
  view_patients: 'View patient information',
  create_patient: 'Register new patients',
  update_patient: 'Update patient information',
  delete_patient: 'Delete patient records',
  view_patient_history: 'View patient medical history',
  
  // Medical records permissions
  view_medical_records: 'View medical records',
  create_medical_records: 'Create medical records',
  update_medical_records: 'Update medical records',
  delete_medical_records: 'Delete medical records',
  
  // Appointment permissions
  view_appointments: 'View appointments',
  create_appointment: 'Create appointments',
  update_appointment: 'Update appointments',
  cancel_appointment: 'Cancel appointments',
  approve_appointment: 'Approve appointments',
  
  // Prescription permissions
  view_prescriptions: 'View prescriptions',
  create_prescription: 'Create prescriptions',
  update_prescription: 'Update prescriptions',
  delete_prescription: 'Delete prescriptions',
  
  // Lab test permissions
  view_lab_tests: 'View lab tests',
  order_lab_test: 'Order lab tests',
  update_lab_test: 'Update lab tests',
  view_lab_results: 'View lab results',
  
  // Billing permissions
  view_invoices: 'View invoices',
  create_invoice: 'Create invoices',
  process_payment: 'Process payments',
  refund_payment: 'Process refunds',
  
  // Staff permissions
  view_staff: 'View staff information',
  manage_staff: 'Manage staff',
  view_schedules: 'View schedules',
  manage_schedules: 'Manage schedules',
  
  // Department permissions
  view_departments: 'View departments',
  manage_departments: 'Manage departments',
  view_bed_occupancy: 'View bed occupancy',
  manage_beds: 'Manage bed allocation',
  
  // Report permissions
  view_reports: 'View reports',
  generate_reports: 'Generate reports',
  export_data: 'Export data',
  
  // System permissions
  view_settings: 'View system settings',
  manage_settings: 'Manage system settings',
  view_audit_logs: 'View audit logs',
  manage_permissions: 'Manage permissions'
}

// Helper function to check if user has permission
export function hasPermission(
  user: User | null | undefined,
  requiredPermission: Permission
): boolean {
  if (!user) return false
  
  // Admin has all permissions
  if (user.role === 'admin') return true
  
  // Check custom permissions if they exist
  if (user.permissions && user.permissions.length > 0) {
    return user.permissions.includes('all') || user.permissions.includes(requiredPermission)
  }
  
  // Check role-based permissions
  const rolePerms = rolePermissions[user.role]
  return rolePerms.includes('all') || rolePerms.includes(requiredPermission)
}

// Helper function to check if user has any of the required permissions
export function hasAnyPermission(
  user: User | null | undefined,
  requiredPermissions: Permission[]
): boolean {
  if (!user) return false
  
  // Admin has all permissions
  if (user.role === 'admin') return true
  
  // Check each permission
  return requiredPermissions.some(permission => hasPermission(user, permission))
}

// Helper function to check if user has all required permissions
export function hasAllPermissions(
  user: User | null | undefined,
  requiredPermissions: Permission[]
): boolean {
  if (!user) return false
  
  // Admin has all permissions
  if (user.role === 'admin') return true
  
  // Check each permission
  return requiredPermissions.every(permission => hasPermission(user, permission))
}

// Helper function to get user permissions
export function getUserPermissions(user: User | null | undefined): Permission[] {
  if (!user) return []
  
  // Admin has all permissions
  if (user.role === 'admin') {
    return Object.keys(permissionDescriptions) as Permission[]
  }
  
  // Return custom permissions if they exist
  if (user.permissions && user.permissions.length > 0) {
    return user.permissions
  }
  
  // Return role-based permissions
  return rolePermissions[user.role] || []
}

// Helper function to check if user has role
export function hasRole(
  user: User | null | undefined,
  requiredRole: UserRole | UserRole[]
): boolean {
  if (!user) return false
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  return roles.includes(user.role)
}

// Helper function to filter users by permission
export function filterUsersByPermission(
  users: User[],
  requiredPermission: Permission
): User[] {
  return users.filter(user => hasPermission(user, requiredPermission))
}

// Helper function to get all permissions for a role
export function getPermissionsByRole(role: UserRole): Permission[] {
  return rolePermissions[role] || []
}

// Helper function to check if permission exists
export function isValidPermission(permission: string): permission is Permission {
  return Object.keys(permissionDescriptions).includes(permission)
}

// Helper function to get permission description
export function getPermissionDescription(permission: Permission): string {
  return permissionDescriptions[permission] || 'Unknown permission'
}

// Helper function to group permissions by category
export function getPermissionsByCategory(): Record<string, Permission[]> {
  return {
    patient: [
      'view_patients',
      'create_patient',
      'update_patient',
      'delete_patient',
      'view_patient_history'
    ],
    medical: [
      'view_medical_records',
      'create_medical_records',
      'update_medical_records',
      'delete_medical_records'
    ],
    appointment: [
      'view_appointments',
      'create_appointment',
      'update_appointment',
      'cancel_appointment',
      'approve_appointment'
    ],
    prescription: [
      'view_prescriptions',
      'create_prescription',
      'update_prescription',
      'delete_prescription'
    ],
    lab: [
      'view_lab_tests',
      'order_lab_test',
      'update_lab_test',
      'view_lab_results'
    ],
    billing: [
      'view_invoices',
      'create_invoice',
      'process_payment',
      'refund_payment'
    ],
    staff: [
      'view_staff',
      'manage_staff',
      'view_schedules',
      'manage_schedules'
    ],
    department: [
      'view_departments',
      'manage_departments',
      'view_bed_occupancy',
      'manage_beds'
    ],
    report: [
      'view_reports',
      'generate_reports',
      'export_data'
    ],
    system: [
      'view_settings',
      'manage_settings',
      'view_audit_logs',
      'manage_permissions'
    ]
  }
}

// Helper function to get category name
export function getCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    patient: 'Patient Management',
    medical: 'Medical Records',
    appointment: 'Appointments',
    prescription: 'Prescriptions',
    lab: 'Laboratory',
    billing: 'Billing & Payments',
    staff: 'Staff Management',
    department: 'Departments',
    report: 'Reports & Analytics',
    system: 'System Settings'
  }
  
  return categoryNames[category] || category
}