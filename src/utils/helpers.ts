// ============================================
// STRING HELPER FUNCTIONS
// ============================================

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalize each word in a string
 */
export function capitalizeWords(str: string): string {
  if (!str) return ''
  return str.split(' ').map(word => capitalize(word)).join(' ')
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (!str) return ''
  if (str.length <= length) return str
  return str.substring(0, length) + suffix
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate random number between min and max
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Convert string to slug (URL friendly)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')          // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start
    .replace(/-+$/, '')              // Trim - from end
}

/**
 * Mask email address (e.g., j***@example.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email
  
  const [localPart, domain] = email.split('@')
  if (localPart.length <= 2) return email
  
  const maskedLocal = localPart.charAt(0) + '***' + localPart.charAt(localPart.length - 1)
  return `${maskedLocal}@${domain}`
}

/**
 * Mask phone number (e.g., +92 *** *** 789)
 */
export function maskPhone(phone: string): string {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\s/g, '')
  if (cleaned.length < 10) return phone
  
  const last4 = cleaned.slice(-4)
  const masked = '*'.repeat(cleaned.length - 4)
  
  return masked + last4
}

// ============================================
// NUMBER HELPER FUNCTIONS
// ============================================

/**
 * Format number with commas (e.g., 1,234,567)
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format currency (e.g., ₨ 1,234)
 */
export function formatCurrency(amount: number, currency: string = '₨'): string {
  return `${currency} ${formatNumber(amount)}`
}

/**
 * Format percentage (e.g., 45.5%)
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Round to decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return roundTo((value / total) * 100)
}

/**
 * Format file size (e.g., 1.5 MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// ============================================
// ARRAY HELPER FUNCTIONS
// ============================================

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by key
 */
export function sortBy<T>(array: T[], key: keyof T, ascending: boolean = true): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1
    if (a[key] > b[key]) return ascending ? 1 : -1
    return 0
  })
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Get random item from array
 */
export function randomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Sum array of numbers
 */
export function sum(array: number[]): number {
  return array.reduce((acc, val) => acc + val, 0)
}

/**
 * Average of array numbers
 */
export function average(array: number[]): number {
  if (array.length === 0) return 0
  return sum(array) / array.length
}

// ============================================
// OBJECT HELPER FUNCTIONS
// ============================================

/**
 * Remove empty values from object
 */
export function removeEmpty(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '' && v !== undefined)
  )
}

/**
 * Pick specific keys from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {} as Pick<T, K>)
}

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

// ============================================
// COLOR HELPER FUNCTIONS
// ============================================

/**
 * Generate random hex color
 */
export function randomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

/**
 * Lighten or darken a color
 */
export function adjustColor(hex: string, percent: number): string {
  let R = parseInt(hex.substring(1,3), 16)
  let G = parseInt(hex.substring(3,5), 16)
  let B = parseInt(hex.substring(5,7), 16)

  R = Math.min(255, Math.max(0, R + R * percent / 100))
  G = Math.min(255, Math.max(0, G + G * percent / 100))
  B = Math.min(255, Math.max(0, B + B * percent / 100))

  return '#' + 
    Math.round(R).toString(16).padStart(2, '0') +
    Math.round(G).toString(16).padStart(2, '0') +
    Math.round(B).toString(16).padStart(2, '0')
}

/**
 * Get contrasting text color (black or white)
 */
export function getContrastColor(hex: string): string {
  const r = parseInt(hex.substring(1,3), 16)
  const g = parseInt(hex.substring(3,5), 16)
  const b = parseInt(hex.substring(5,7), 16)
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate phone number (Pakistan format)
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^(\+92|0)?[0-9]{10,13}$/
  return regex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate CNIC (Pakistan ID card)
 */
export function isValidCNIC(cnic: string): boolean {
  const regex = /^[0-9]{5}-[0-9]{7}-[0-9]$/
  return regex.test(cnic)
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): {
  score: number
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
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

  let strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  if (score < 50) strength = 'weak'
  else if (score < 75) strength = 'medium'
  else if (score < 90) strength = 'strong'
  else strength = 'very-strong'

  const message = messages.length > 0
    ? `Password must contain ${messages.join(', ')}`
    : 'Password is strong'

  return { score, strength, message }
}

// ============================================
// STORAGE HELPER FUNCTIONS
// ============================================

/**
 * Save to localStorage
 */
export function saveToStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Load from localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

/**
 * Remove from localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

/**
 * Clear localStorage
 */
export function clearStorage(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// ============================================
// COOKIE HELPER FUNCTIONS
// ============================================

/**
 * Set cookie
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

/**
 * Get cookie
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * Delete cookie
 */
export function deleteCookie(name: string): void {
  document.cookie = name + '=; Max-Age=-99999999;'
}

// ============================================
// DEBOUNCE & THROTTLE FUNCTIONS
// ============================================

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ============================================
// HOSPITAL-SPECIFIC HELPER FUNCTIONS
// ============================================

/**
 * Format patient ID
 */
export function formatPatientId(id: string | number): string {
  return `P-${String(id).padStart(6, '0')}`
}

/**
 * Format doctor ID
 */
export function formatDoctorId(id: string | number): string {
  return `D-${String(id).padStart(6, '0')}`
}

/**
 * Format appointment ID
 */
export function formatAppointmentId(id: string | number): string {
  return `A-${String(id).padStart(6, '0')}`
}

/**
 * Get blood group display
 */
export function getBloodGroupDisplay(bloodGroup: string): string {
  const groups: Record<string, string> = {
    'A+': 'A Positive',
    'A-': 'A Negative',
    'B+': 'B Positive',
    'B-': 'B Negative',
    'AB+': 'AB Positive',
    'AB-': 'AB Negative',
    'O+': 'O Positive',
    'O-': 'O Negative',
  }
  return groups[bloodGroup] || bloodGroup
}

/**
 * Calculate BMI (Body Mass Index)
 */
export function calculateBMI(weight: number, height: number): number {
  if (weight <= 0 || height <= 0) return 0
  const heightInMeters = height / 100
  return roundTo(weight / (heightInMeters * heightInMeters), 1)
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  if (bmi < 35) return 'Obese Class I'
  if (bmi < 40) return 'Obese Class II'
  return 'Obese Class III'
}

/**
 * Calculate estimated due date (EDD) from LMP
 */
export function calculateEDD(lastMenstrualPeriod: string): string {
  const lmp = new Date(lastMenstrualPeriod)
  if (isNaN(lmp.getTime())) return ''
  
  const edd = new Date(lmp)
  edd.setDate(lmp.getDate() + 280) // 40 weeks
  
  return edd.toISOString().split('T')[0]
}

/**
 * Calculate gestational age in weeks
 */
export function calculateGestationalAge(lmp: string): number {
  const lmpDate = new Date(lmp)
  const today = new Date()
  
  if (isNaN(lmpDate.getTime())) return 0
  
  const diffTime = Math.abs(today.getTime() - lmpDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.floor(diffDays / 7)
}

/**
 * Determine patient priority based on vitals
 */
export function getPatientPriority(vitals: {
  heartRate?: number
  bloodPressureSystolic?: number
  temperature?: number
  oxygenLevel?: number
}): 'routine' | 'urgent' | 'emergency' | 'critical' {
  const { heartRate, bloodPressureSystolic, temperature, oxygenLevel } = vitals

  // Critical conditions
  if (
    (heartRate && (heartRate < 40 || heartRate > 140)) ||
    (bloodPressureSystolic && bloodPressureSystolic < 70) ||
    (oxygenLevel && oxygenLevel < 85)
  ) {
    return 'critical'
  }

  // Emergency conditions
  if (
    (heartRate && (heartRate > 120 || heartRate < 50)) ||
    (bloodPressureSystolic && bloodPressureSystolic > 180) ||
    (temperature && temperature > 103) ||
    (oxygenLevel && oxygenLevel < 90)
  ) {
    return 'emergency'
  }

  // Urgent conditions
  if (
    (heartRate && (heartRate > 100 || heartRate < 60)) ||
    (bloodPressureSystolic && bloodPressureSystolic > 140) ||
    (temperature && temperature > 101) ||
    (oxygenLevel && oxygenLevel < 95)
  ) {
    return 'urgent'
  }

  return 'routine'
}

/**
 * Calculate bed occupancy rate
 */
export function calculateBedOccupancy(occupied: number, total: number): number {
  if (total === 0) return 0
  return roundTo((occupied / total) * 100, 1)
}

/**
 * Format waiting list position
 */
export function formatWaitingListPosition(position: number, total: number): string {
  return `${position} of ${total}`
}

/**
 * Get time slot from time string
 */
export function getTimeSlot(time: string): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = parseInt(time.split(':')[0])
  
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  if (hour < 21) return 'evening'
  return 'night'
}

// ============================================
// ERROR HANDLING HELPER FUNCTIONS
// ============================================

/**
 * Get error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'An unknown error occurred'
}

/**
 * Try catch wrapper for async functions
 */
export async function tryCatch<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    }
  }
  
  throw lastError!
}