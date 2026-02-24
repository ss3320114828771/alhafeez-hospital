// Types
export interface Patient {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  address: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  medicalHistory?: string[]
  allergies?: string[]
  createdAt: string
  updatedAt: string
}

export interface Doctor {
  id: string
  fullName: string
  email: string
  phone: string
  specialization: string
  qualification: string[]
  experience: number
  department: string
  availability: {
    days: string[]
    hours: string
  }
  consultationFee: number
  rating?: number
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  type: 'consultation' | 'follow-up' | 'emergency' | 'checkup'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Prescription {
  id: string
  patientId: string
  doctorId: string
  date: string
  medicines: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }[]
  diagnosis?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  date: string
  type: 'diagnosis' | 'test' | 'procedure' | 'note'
  title: string
  description: string
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  head: string
  location: string
  extension: string
  totalBeds: number
  availableBeds: number
  createdAt: string
  updatedAt: string
}

export interface LabTest {
  id: string
  patientId: string
  doctorId: string
  testName: string
  testType: string
  sampleType: string
  sampleCollectedAt: string
  resultReadyAt?: string
  result?: {
    value: string
    unit: string
    referenceRange: string
    status: 'normal' | 'abnormal' | 'critical'
  }[]
  status: 'ordered' | 'collected' | 'processing' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  patientId: string
  appointmentId?: string
  date: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  paymentMethod?: 'cash' | 'card' | 'insurance' | 'bank-transfer'
  paymentDate?: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

// Mock Database
class Database {
  private patients: Patient[] = []
  private doctors: Doctor[] = []
  private appointments: Appointment[] = []
  private prescriptions: Prescription[] = []
  private medicalRecords: MedicalRecord[] = []
  private departments: Department[] = []
  private labTests: LabTest[] = []
  private invoices: Invoice[] = []

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Add mock patients
    this.patients.push(
      {
        id: 'P001',
        fullName: 'Muhammad Ali',
        email: 'm.ali@example.com',
        phone: '+923001234567',
        dateOfBirth: '1985-06-15',
        gender: 'male',
        bloodGroup: 'B+',
        address: '123 Main Street, Faisalabad',
        emergencyContact: {
          name: 'Fatima Ali',
          relationship: 'Wife',
          phone: '+923007654321'
        },
        medicalHistory: ['Hypertension', 'Diabetes Type 2'],
        allergies: ['Penicillin'],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'P002',
        fullName: 'Sara Khan',
        email: 'sara.k@example.com',
        phone: '+923001112233',
        dateOfBirth: '1990-03-22',
        gender: 'female',
        bloodGroup: 'A+',
        address: '456 Canal Road, Faisalabad',
        emergencyContact: {
          name: 'Ahmed Khan',
          relationship: 'Brother',
          phone: '+923004445566'
        },
        medicalHistory: ['Asthma'],
        allergies: ['Sulfa'],
        createdAt: '2024-02-10T14:20:00Z',
        updatedAt: '2024-02-10T14:20:00Z'
      }
    )

    // Add mock doctors
    this.doctors.push(
      {
        id: 'D001',
        fullName: 'Dr. Ahmed Khan',
        email: 'ahmed@alhafeez.com',
        phone: '+923001234567',
        specialization: 'Cardiology',
        qualification: ['MBBS', 'FCPS Cardiology'],
        experience: 15,
        department: 'Cardiology',
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: '9:00 AM - 2:00 PM'
        },
        consultationFee: 2000,
        rating: 4.8,
        createdAt: '2020-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'D002',
        fullName: 'Dr. Fatima Ali',
        email: 'fatima@alhafeez.com',
        phone: '+923007654321',
        specialization: 'Neurology',
        qualification: ['MBBS', 'MD Neurology'],
        experience: 12,
        department: 'Neurology',
        availability: {
          days: ['Tuesday', 'Thursday', 'Saturday'],
          hours: '10:00 AM - 3:00 PM'
        },
        consultationFee: 2500,
        rating: 4.9,
        createdAt: '2021-03-10T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    )

    // Add mock appointments
    this.appointments.push(
      {
        id: 'A001',
        patientId: 'P001',
        doctorId: 'D001',
        date: '2024-03-20',
        time: '10:30 AM',
        status: 'scheduled',
        type: 'follow-up',
        notes: 'Follow-up for hypertension',
        createdAt: '2024-03-15T09:00:00Z',
        updatedAt: '2024-03-15T09:00:00Z'
      },
      {
        id: 'A002',
        patientId: 'P002',
        doctorId: 'D002',
        date: '2024-03-20',
        time: '11:30 AM',
        status: 'scheduled',
        type: 'consultation',
        notes: 'First consultation for headaches',
        createdAt: '2024-03-16T10:00:00Z',
        updatedAt: '2024-03-16T10:00:00Z'
      }
    )

    // Add mock departments
    this.departments.push(
      {
        id: 'DEP001',
        name: 'Cardiology',
        head: 'Dr. Ahmed Khan',
        location: 'Floor 2, Wing A',
        extension: '201',
        totalBeds: 30,
        availableBeds: 8,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'DEP002',
        name: 'Neurology',
        head: 'Dr. Fatima Ali',
        location: 'Floor 3, Wing B',
        extension: '301',
        totalBeds: 20,
        availableBeds: 5,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'DEP003',
        name: 'Emergency',
        head: 'Dr. Imran Qureshi',
        location: 'Ground Floor',
        extension: '101',
        totalBeds: 15,
        availableBeds: 3,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    )
  }

  // Patient methods
  async getPatients(): Promise<Patient[]> {
    return this.patients
  }

  async getPatientById(id: string): Promise<Patient | undefined> {
    return this.patients.find(p => p.id === id)
  }

  async createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: `P${String(this.patients.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.patients.push(newPatient)
    return newPatient
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | undefined> {
    const index = this.patients.findIndex(p => p.id === id)
    if (index === -1) return undefined

    this.patients[index] = {
      ...this.patients[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.patients[index]
  }

  async deletePatient(id: string): Promise<boolean> {
    const index = this.patients.findIndex(p => p.id === id)
    if (index === -1) return false
    this.patients.splice(index, 1)
    return true
  }

  // Doctor methods
  async getDoctors(): Promise<Doctor[]> {
    return this.doctors
  }

  async getDoctorById(id: string): Promise<Doctor | undefined> {
    return this.doctors.find(d => d.id === id)
  }

  async getDoctorsByDepartment(department: string): Promise<Doctor[]> {
    return this.doctors.filter(d => d.department === department)
  }

  async createDoctor(doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor> {
    const newDoctor: Doctor = {
      ...doctor,
      id: `D${String(this.doctors.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.doctors.push(newDoctor)
    return newDoctor
  }

  async updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | undefined> {
    const index = this.doctors.findIndex(d => d.id === id)
    if (index === -1) return undefined

    this.doctors[index] = {
      ...this.doctors[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.doctors[index]
  }

  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return this.appointments
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    return this.appointments.find(a => a.id === id)
  }

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    return this.appointments.filter(a => a.patientId === patientId)
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return this.appointments.filter(a => a.doctorId === doctorId)
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return this.appointments.filter(a => a.date === date)
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    const newAppointment: Appointment = {
      ...appointment,
      id: `A${String(this.appointments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.appointments.push(newAppointment)
    return newAppointment
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | undefined> {
    const index = this.appointments.findIndex(a => a.id === id)
    if (index === -1) return undefined

    this.appointments[index] = {
      ...this.appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return this.appointments[index]
  }

  async cancelAppointment(id: string): Promise<Appointment | undefined> {
    const index = this.appointments.findIndex(a => a.id === id)
    if (index === -1) return undefined

    this.appointments[index].status = 'cancelled'
    this.appointments[index].updatedAt = new Date().toISOString()
    return this.appointments[index]
  }

  // Prescription methods
  async getPrescriptions(): Promise<Prescription[]> {
    return this.prescriptions
  }

  async getPrescriptionById(id: string): Promise<Prescription | undefined> {
    return this.prescriptions.find(p => p.id === id)
  }

  async getPrescriptionsByPatient(patientId: string): Promise<Prescription[]> {
    return this.prescriptions.filter(p => p.patientId === patientId)
  }

  async createPrescription(prescription: Omit<Prescription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prescription> {
    const newPrescription: Prescription = {
      ...prescription,
      id: `RX${String(this.prescriptions.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.prescriptions.push(newPrescription)
    return newPrescription
  }

  // Medical Records methods
  async getMedicalRecords(): Promise<MedicalRecord[]> {
    return this.medicalRecords
  }

  async getMedicalRecordsByPatient(patientId: string): Promise<MedicalRecord[]> {
    return this.medicalRecords.filter(r => r.patientId === patientId)
  }

  async createMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalRecord> {
    const newRecord: MedicalRecord = {
      ...record,
      id: `MR${String(this.medicalRecords.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.medicalRecords.push(newRecord)
    return newRecord
  }

  // Department methods
  async getDepartments(): Promise<Department[]> {
    return this.departments
  }

  async getDepartmentById(id: string): Promise<Department | undefined> {
    return this.departments.find(d => d.id === id)
  }

  async updateDepartmentBeds(id: string, availableBeds: number): Promise<Department | undefined> {
    const index = this.departments.findIndex(d => d.id === id)
    if (index === -1) return undefined

    this.departments[index].availableBeds = availableBeds
    this.departments[index].updatedAt = new Date().toISOString()
    return this.departments[index]
  }

  // Lab Test methods
  async getLabTests(): Promise<LabTest[]> {
    return this.labTests
  }

  async getLabTestsByPatient(patientId: string): Promise<LabTest[]> {
    return this.labTests.filter(t => t.patientId === patientId)
  }

  async createLabTest(test: Omit<LabTest, 'id' | 'createdAt' | 'updatedAt'>): Promise<LabTest> {
    const newTest: LabTest = {
      ...test,
      id: `LT${String(this.labTests.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.labTests.push(newTest)
    return newTest
  }

  async updateLabTestResult(id: string, result: LabTest['result'], status: LabTest['status']): Promise<LabTest | undefined> {
    const index = this.labTests.findIndex(t => t.id === id)
    if (index === -1) return undefined

    this.labTests[index].result = result
    this.labTests[index].status = status
    this.labTests[index].resultReadyAt = new Date().toISOString()
    this.labTests[index].updatedAt = new Date().toISOString()
    return this.labTests[index]
  }

  // Invoice methods
  async getInvoices(): Promise<Invoice[]> {
    return this.invoices
  }

  async getInvoicesByPatient(patientId: string): Promise<Invoice[]> {
    return this.invoices.filter(i => i.patientId === patientId)
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV${String(this.invoices.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.invoices.push(newInvoice)
    return newInvoice
  }

  async updateInvoicePayment(id: string, paymentMethod: Invoice['paymentMethod']): Promise<Invoice | undefined> {
    const index = this.invoices.findIndex(i => i.id === id)
    if (index === -1) return undefined

    this.invoices[index].status = 'paid'
    this.invoices[index].paymentMethod = paymentMethod
    this.invoices[index].paymentDate = new Date().toISOString()
    this.invoices[index].updatedAt = new Date().toISOString()
    return this.invoices[index]
  }

  // Statistics methods
  async getDashboardStats(): Promise<any> {
    const today = new Date().toISOString().split('T')[0]
    
    return {
      totalPatients: this.patients.length,
      totalDoctors: this.doctors.length,
      todayAppointments: this.appointments.filter(a => a.date === today).length,
      pendingAppointments: this.appointments.filter(a => a.status === 'scheduled').length,
      availableBeds: this.departments.reduce((sum, d) => sum + d.availableBeds, 0),
      totalBeds: this.departments.reduce((sum, d) => sum + d.totalBeds, 0),
      occupancyRate: Math.round((1 - this.departments.reduce((sum, d) => sum + d.availableBeds, 0) / this.departments.reduce((sum, d) => sum + d.totalBeds, 0)) * 100),
      pendingInvoices: this.invoices.filter(i => i.status === 'pending').length,
      totalRevenue: this.invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0)
    }
  }

  // Search methods
  async searchPatients(query: string): Promise<Patient[]> {
    const lowerQuery = query.toLowerCase()
    return this.patients.filter(p => 
      p.fullName.toLowerCase().includes(lowerQuery) ||
      p.email.toLowerCase().includes(lowerQuery) ||
      p.phone.includes(query) ||
      p.id.toLowerCase().includes(lowerQuery)
    )
  }

  async searchDoctors(query: string): Promise<Doctor[]> {
    const lowerQuery = query.toLowerCase()
    return this.doctors.filter(d => 
      d.fullName.toLowerCase().includes(lowerQuery) ||
      d.specialization.toLowerCase().includes(lowerQuery) ||
      d.department.toLowerCase().includes(lowerQuery)
    )
  }

  // Reset database (for development)
  async resetDatabase(): Promise<void> {
    this.patients = []
    this.doctors = []
    this.appointments = []
    this.prescriptions = []
    this.medicalRecords = []
    this.departments = []
    this.labTests = []
    this.invoices = []
    this.initializeMockData()
  }
}

// Export singleton instance
export const db = new Database()