'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Doctor {
  id: number
  name: string
  specialty: string
  qualification: string
  experience: string
  image: string
  department: string
  availability: string
  social: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

export default function Doctors() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = [
    { id: 'all', name: 'All Doctors' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'surgery', name: 'Surgery' },
    { id: 'orthopedics', name: 'Orthopedics' }
  ]

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Ahmed Khan',
      specialty: 'Cardiologist',
      qualification: 'MBBS, FCPS (Cardiology)',
      experience: '25+ years',
      image: '',
      department: 'cardiology',
      availability: 'Mon-Fri, 9AM-2PM',
      social: {
        facebook: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Dr. Fatima Ali',
      specialty: 'Neurologist',
      qualification: 'MBBS, MD (Neurology)',
      experience: '20+ years',
      image: '',
      department: 'neurology',
      availability: 'Mon-Wed, 10AM-4PM',
      social: {
        facebook: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'Dr. Muhammad Usman',
      specialty: 'Pediatrician',
      qualification: 'MBBS, DCH',
      experience: '18+ years',
      image: '',
      department: 'pediatrics',
      availability: 'Tue-Thu, 9AM-3PM',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 4,
      name: 'Dr. Sara Ahmed',
      specialty: 'General Surgeon',
      qualification: 'MBBS, FRCS',
      experience: '15+ years',
      image: '',
      department: 'surgery',
      availability: 'Mon-Fri, 11AM-5PM',
      social: {
        facebook: '#',
        linkedin: '#'
      }
    },
    {
      id: 5,
      name: 'Dr. Omar Hassan',
      specialty: 'Orthopedic Surgeon',
      qualification: 'MBBS, MS (Ortho)',
      experience: '22+ years',
      image: '',
      department: 'orthopedics',
      availability: 'Wed-Sat, 10AM-3PM',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 6,
      name: 'Dr. Ayesha Mirza',
      specialty: 'Cardiologist',
      qualification: 'MBBS, FCPS (Cardiology)',
      experience: '16+ years',
      image: '',
      department: 'cardiology',
      availability: 'Mon-Thu, 2PM-7PM',
      social: {
        facebook: '#',
        linkedin: '#'
      }
    },
    {
      id: 7,
      name: 'Dr. Imran Qureshi',
      specialty: 'Neurosurgeon',
      qualification: 'MBBS, FCPS (Neurosurgery)',
      experience: '19+ years',
      image: '',
      department: 'neurology',
      availability: 'Tue-Fri, 9AM-1PM',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      id: 8,
      name: 'Dr. Zainab Malik',
      specialty: 'Pediatric Surgeon',
      qualification: 'MBBS, FCPS (Pediatric Surgery)',
      experience: '14+ years',
      image: 'n7.jpeg',
      department: 'pediatrics',
      availability: 'Mon-Wed, 11AM-4PM',
      social: {
        facebook: '#',
        linkedin: '#'
      }
    }
  ]

  // Filter doctors based on selected department
  const filteredDoctors = selectedDepartment === 'all'
    ? doctors
    : doctors.filter(doc => doc.department === selectedDepartment)

  // Get department color
  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      cardiology: 'from-red-500 to-pink-500',
      neurology: 'from-purple-500 to-indigo-500',
      pediatrics: 'from-green-500 to-teal-500',
      surgery: 'from-blue-500 to-cyan-500',
      orthopedics: 'from-orange-500 to-amber-500'
    }
    return colors[department] || 'from-gray-500 to-gray-600'
  }

  return (
    <section id="doctors" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Medical Team
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experienced doctors dedicated to providing the best healthcare
          </p>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                selectedDepartment === dept.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition group"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800">
                {/* Placeholder Avatar with Initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-24 h-24 bg-gradient-to-r ${getDepartmentColor(doctor.department)} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-3xl font-bold">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 bg-gradient-to-r ${getDepartmentColor(doctor.department)} text-white text-xs rounded-full`}>
                    {doctor.specialty}
                  </span>
                </div>

                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-3">
                  {doctor.social.facebook && (
                    <a href={doctor.social.facebook} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                      <i className="fab fa-facebook-f text-gray-800 hover:text-white"></i>
                    </a>
                  )}
                  {doctor.social.twitter && (
                    <a href={doctor.social.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                      <i className="fab fa-twitter text-gray-800 hover:text-white"></i>
                    </a>
                  )}
                  {doctor.social.linkedin && (
                    <a href={doctor.social.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                      <i className="fab fa-linkedin-in text-gray-800 hover:text-white"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-1">{doctor.name}</h3>
                <p className="text-blue-400 text-sm mb-2">{doctor.qualification}</p>
                <p className="text-gray-400 text-sm mb-3">{doctor.experience} experience</p>
                
                {/* Availability */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fas fa-clock text-gray-500 mr-2"></i>
                  <span>{doctor.availability}</span>
                </div>

                {/* Appointment Button */}
                <Link
                  href={`/appointment?doctor=${doctor.id}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/doctors"
            className="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View All Doctors
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}