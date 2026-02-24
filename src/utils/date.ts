// ============================================
// DATE FORMATTING FUNCTIONS
// ============================================

/**
 * Format a date to display format (e.g., "Jan 15, 2024")
 */
export function formatDate(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid date'
    
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format a date with time (e.g., "Jan 15, 2024 10:30 AM")
 */
export function formatDateTime(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid date'
    
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format time only (e.g., "10:30 AM")
 */
export function formatTime(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid time'
    
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return 'Invalid time'
  }
}

/**
 * Format date for API (YYYY-MM-DD)
 */
export function formatDateForAPI(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  } catch {
    return ''
  }
}

/**
 * Format date for file names (YYYY-MM-DD-HHmmss)
 */
export function formatDateForFile(date: Date | string | number = new Date()): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    
    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`
  } catch {
    return ''
  }
}

/**
 * Format date in full (e.g., "Monday, January 15, 2024")
 */
export function formatDateFull(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid date'
    
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: Date | string | number): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return 'Invalid date'
    
    const now = new Date()
    const diffMs = d.getTime() - now.getTime()
    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHour = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHour / 24)
    const diffWeek = Math.round(diffDay / 7)
    const diffMonth = Math.round(diffDay / 30)
    const diffYear = Math.round(diffDay / 365)

    const absDiffSec = Math.abs(diffSec)
    const absDiffMin = Math.abs(diffMin)
    const absDiffHour = Math.abs(diffHour)
    const absDiffDay = Math.abs(diffDay)
    const absDiffWeek = Math.abs(diffWeek)
    const absDiffMonth = Math.abs(diffMonth)
    const absDiffYear = Math.abs(diffYear)

    const isPast = diffMs < 0

    if (absDiffSec < 60) {
      return isPast ? 'just now' : 'in a moment'
    } else if (absDiffMin < 60) {
      return isPast 
        ? `${absDiffMin} minute${absDiffMin > 1 ? 's' : ''} ago`
        : `in ${absDiffMin} minute${absDiffMin > 1 ? 's' : ''}`
    } else if (absDiffHour < 24) {
      return isPast
        ? `${absDiffHour} hour${absDiffHour > 1 ? 's' : ''} ago`
        : `in ${absDiffHour} hour${absDiffHour > 1 ? 's' : ''}`
    } else if (absDiffDay < 7) {
      return isPast
        ? `${absDiffDay} day${absDiffDay > 1 ? 's' : ''} ago`
        : `in ${absDiffDay} day${absDiffDay > 1 ? 's' : ''}`
    } else if (absDiffWeek < 4) {
      return isPast
        ? `${absDiffWeek} week${absDiffWeek > 1 ? 's' : ''} ago`
        : `in ${absDiffWeek} week${absDiffWeek > 1 ? 's' : ''}`
    } else if (absDiffMonth < 12) {
      return isPast
        ? `${absDiffMonth} month${absDiffMonth > 1 ? 's' : ''} ago`
        : `in ${absDiffMonth} month${absDiffMonth > 1 ? 's' : ''}`
    } else {
      return isPast
        ? `${absDiffYear} year${absDiffYear > 1 ? 's' : ''} ago`
        : `in ${absDiffYear} year${absDiffYear > 1 ? 's' : ''}`
    }
  } catch {
    return 'Invalid date'
  }
}

// ============================================
// DATE CALCULATION FUNCTIONS
// ============================================

/**
 * Get the number of days between two dates
 */
export function daysBetween(date1: Date | string | number, date2: Date | string | number): number {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0
    
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  } catch {
    return 0
  }
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setDate(d.getDate() + days)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Add months to a date
 */
export function addMonths(date: Date | string | number, months: number): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setMonth(d.getMonth() + months)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Add years to a date
 */
export function addYears(date: Date | string | number, years: number): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setFullYear(d.getFullYear() + years)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the start of day (00:00:00)
 */
export function startOfDay(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setHours(0, 0, 0, 0)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the end of day (23:59:59.999)
 */
export function endOfDay(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setHours(23, 59, 59, 999)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the start of week (Sunday)
 */
export function startOfWeek(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    const day = d.getDay()
    d.setDate(d.getDate() - day)
    d.setHours(0, 0, 0, 0)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the end of week (Saturday)
 */
export function endOfWeek(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    const day = d.getDay()
    d.setDate(d.getDate() + (6 - day))
    d.setHours(23, 59, 59, 999)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the start of month
 */
export function startOfMonth(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the end of month
 */
export function endOfMonth(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setMonth(d.getMonth() + 1)
    d.setDate(0)
    d.setHours(23, 59, 59, 999)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the start of year
 */
export function startOfYear(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setMonth(0, 1)
    d.setHours(0, 0, 0, 0)
    return d
  } catch {
    return new Date()
  }
}

/**
 * Get the end of year
 */
export function endOfYear(date: Date | string | number = new Date()): Date {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return new Date()
    
    d.setMonth(11, 31)
    d.setHours(23, 59, 59, 999)
    return d
  } catch {
    return new Date()
  }
}

// ============================================
// DATE VALIDATION FUNCTIONS
// ============================================

/**
 * Check if a date is valid
 */
export function isValidDate(date: any): boolean {
  if (!date) return false
  
  try {
    const d = new Date(date)
    return !isNaN(d.getTime())
  } catch {
    return false
  }
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    const today = new Date()
    return d.toDateString() === today.toDateString()
  } catch {
    return false
  }
}

/**
 * Check if a date is tomorrow
 */
export function isTomorrow(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return d.toDateString() === tomorrow.toDateString()
  } catch {
    return false
  }
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return d.toDateString() === yesterday.toDateString()
  } catch {
    return false
  }
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    return d.getTime() < Date.now()
  } catch {
    return false
  }
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    return d.getTime() > Date.now()
  } catch {
    return false
  }
}

/**
 * Check if a date is within a range
 */
export function isWithinRange(
  date: Date | string | number,
  start: Date | string | number,
  end: Date | string | number
): boolean {
  try {
    const d = new Date(date)
    const s = new Date(start)
    const e = new Date(end)
    
    if (isNaN(d.getTime()) || isNaN(s.getTime()) || isNaN(e.getTime())) return false
    
    return d >= s && d <= e
  } catch {
    return false
  }
}

/**
 * Check if a date is a weekend
 */
export function isWeekend(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    const day = d.getDay()
    return day === 0 || day === 6
  } catch {
    return false
  }
}

/**
 * Check if a date is a weekday
 */
export function isWeekday(date: Date | string | number): boolean {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return false
    
    const day = d.getDay()
    return day >= 1 && day <= 5
  } catch {
    return false
  }
}

// ============================================
// DATE COMPARISON FUNCTIONS
// ============================================

/**
 * Compare two dates (returns -1, 0, 1)
 */
export function compareDates(
  date1: Date | string | number,
  date2: Date | string | number
): -1 | 0 | 1 {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0
    
    if (d1 < d2) return -1
    if (d1 > d2) return 1
    return 0
  } catch {
    return 0
  }
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false
    
    return d1.toDateString() === d2.toDateString()
  } catch {
    return false
  }
}

/**
 * Check if two dates are the same month
 */
export function isSameMonth(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false
    
    return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  } catch {
    return false
  }
}

/**
 * Check if two dates are the same year
 */
export function isSameYear(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  try {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false
    
    return d1.getFullYear() === d2.getFullYear()
  } catch {
    return false
  }
}

// ============================================
// AGE CALCULATION
// ============================================

/**
 * Calculate age from birthdate
 */
export function calculateAge(birthDate: Date | string | number): number {
  try {
    const today = new Date()
    const birth = new Date(birthDate)
    
    if (isNaN(birth.getTime())) return 0
    
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  } catch {
    return 0
  }
}

/**
 * Get age in years, months, and days
 */
export function getAgeDetails(birthDate: Date | string | number): {
  years: number
  months: number
  days: number
  totalDays: number
} {
  try {
    const today = new Date()
    const birth = new Date(birthDate)
    
    if (isNaN(birth.getTime())) {
      return { years: 0, months: 0, days: 0, totalDays: 0 }
    }
    
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()
    
    if (days < 0) {
      months--
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }
    
    if (months < 0) {
      years--
      months += 12
    }
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    
    return { years, months, days, totalDays }
  } catch {
    return { years: 0, months: 0, days: 0, totalDays: 0 }
  }
}

// ============================================
// HOSPITAL-SPECIFIC DATE FUNCTIONS
// ============================================

/**
 * Get upcoming appointments (within next 7 days)
 */
export function getUpcomingAppointments(appointments: { date: string }[]): any[] {
  const now = new Date()
  const nextWeek = addDays(now, 7)
  
  return appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    return aptDate >= now && aptDate <= nextWeek
  })
}

/**
 * Check if appointment is overdue
 */
export function isAppointmentOverdue(appointmentDate: string): boolean {
  const aptDate = new Date(appointmentDate)
  const now = new Date()
  return aptDate < now
}

/**
 * Get age category for patient
 */
export function getAgeCategory(birthDate: string): 'infant' | 'child' | 'teen' | 'adult' | 'senior' {
  const age = calculateAge(birthDate)
  
  if (age < 1) return 'infant'
  if (age < 13) return 'child'
  if (age < 20) return 'teen'
  if (age < 65) return 'adult'
  return 'senior'
}

/**
 * Format waiting time (for ER/OPD)
 */
export function formatWaitingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? 's' : ''}`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  }
  
  return `${hours}h ${remainingMinutes}m`
}

/**
 * Get current shift based on time
 */
export function getCurrentShift(): 'morning' | 'evening' | 'night' {
  const hour = new Date().getHours()
  
  if (hour >= 6 && hour < 14) return 'morning'
  if (hour >= 14 && hour < 22) return 'evening'
  return 'night'
}

/**
 * Check if date is within working hours
 */
export function isWithinWorkingHours(date: Date | string | number): boolean {
  const d = new Date(date)
  const hour = d.getHours()
  const day = d.getDay() // 0 = Sunday, 6 = Saturday
  
  // Sunday closed
  if (day === 0) return false
  
  // Saturday half day
  if (day === 6) return hour >= 9 && hour < 14
  
  // Weekdays 9 AM to 5 PM
  return hour >= 9 && hour < 17
}