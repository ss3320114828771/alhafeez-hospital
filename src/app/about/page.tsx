'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Types
interface TeamMember {
  id: number
  name: string
  role: string
  qualification: string
  specialty: string
  experience: string
  image: string
  social: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

interface Milestone {
  year: string
  title: string
  description: string
  icon: string
}

interface Value {
  icon: string
  title: string
  description: string
  color: string
}

interface Achievement {
  icon: string
  title: string
  description: string
}

interface Facility {
  name: string
  icon: string
  color: string
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('mission')

  // Handle mounting to avoid hydration errors
  useEffect(() => {
    setMounted(true)
    
    // Initialize AOS animations if available
    if (typeof window !== 'undefined') {
      // You can add AOS initialization here if needed
    }
  }, [])

  // Don't render until mounted
  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated Background - Fixed with inline styles for delays */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-sm mb-6">
              <Link href="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <i className="fas fa-chevron-right text-gray-500 text-xs"></i>
              <span className="text-blue-400">About Us</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Alhafeez
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Providing compassionate healthcare with cutting-edge technology since 2000
            </p>

            {/* Stats Preview */}
            <div className="flex justify-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-gray-400 text-sm">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-gray-400 text-sm">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-gray-400 text-sm">Doctors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#111827" opacity="0.5"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Vision Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-12">
            {[
              { id: 'mission', label: 'Our Mission', icon: 'fa-bullseye' },
              { id: 'vision', label: 'Our Vision', icon: 'fa-eye' },
              { id: 'values', label: 'Our Values', icon: 'fa-heart' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <i className="fas fa-bullseye text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To provide exceptional, compassionate healthcare services that improve the quality of life for our community. We are committed to delivering patient-centered care with the highest standards of medical excellence, innovation, and integrity.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <i className="fas fa-eye text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To be the leading healthcare provider in the region, recognized for clinical excellence, innovative treatments, and compassionate care. We envision a future where advanced medical technology and human touch combine to create the perfect healing environment.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <i className="fas fa-heart text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  {values.map((value, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                        <i className={`fas ${value.icon} text-white text-xl`}></i>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-400 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Two decades of dedicated service to our community
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="mr-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <i className={`fas ${milestone.icon} text-white text-2xl`}></i>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-sm text-blue-400 font-semibold">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dedicated professionals committed to your health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white text-center mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm text-center mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs text-center mb-3">{member.qualification}</p>
                <p className="text-gray-500 text-xs text-center mb-4">{member.specialty} • {member.experience}</p>

                <div className="flex justify-center space-x-3">
                  {member.social.facebook && (
                    <a href={member.social.facebook} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                      <i className="fab fa-facebook-f text-white text-xs"></i>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                      <i className="fab fa-twitter text-white text-xs"></i>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                      <i className="fab fa-linkedin-in text-white text-xs"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Achievements */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Achievements */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Achievements</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Recognized for excellence in healthcare and patient satisfaction
              </p>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${achievement.icon} text-green-400 text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{achievement.title}</h4>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Facilities */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Facilities</span>
              </h2>
              <p className="text-gray-300 mb-8">
                State-of-the-art infrastructure for comprehensive healthcare
              </p>

              <div className="grid grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition group">
                    <div className={`w-12 h-12 ${facility.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                      <i className={`fas ${facility.icon} text-white text-xl`}></i>
                    </div>
                    <h4 className="text-white text-sm font-medium">{facility.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the Alhafeez Difference
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their health
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/appointment"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Book Appointment
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border border-white text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// Data
const values: Value[] = [
  {
    icon: 'fa-heart',
    title: 'Compassion',
    description: 'We treat every patient with empathy, dignity, and respect.',
    color: 'bg-red-500'
  },
  {
    icon: 'fa-star',
    title: 'Excellence',
    description: 'We strive for the highest standards in medical care.',
    color: 'bg-yellow-500'
  },
  {
    icon: 'fa-hand-holding-heart',
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in all we do.',
    color: 'bg-green-500'
  },
  {
    icon: 'fa-users',
    title: 'Teamwork',
    description: 'We collaborate to provide comprehensive patient care.',
    color: 'bg-blue-500'
  }
]

const milestones: Milestone[] = [
  {
    year: '2000',
    title: 'Foundation',
    description: 'Alhafeez Hospital was established in Amin Pur Banglow, Faisalabad with 50 beds.',
    icon: 'fa-flag'
  },
  {
    year: '2008',
    title: 'Expansion',
    description: 'Added new wing with 100 beds and modern operating theaters.',
    icon: 'fa-building'
  },
  {
    year: '2015',
    title: 'Digital Transformation',
    description: 'Implemented electronic health records and digital imaging systems.',
    icon: 'fa-laptop-medical'
  },
  {
    year: '2020',
    title: 'COVID-19 Response',
    description: 'Established dedicated COVID-19 facility and vaccination center.',
    icon: 'fa-shield-virus'
  },
  {
    year: '2024',
    title: 'Center of Excellence',
    description: 'Recognized as a center of excellence in cardiology and neurology.',
    icon: 'fa-trophy'
  }
]

const team: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Ahmed Khan',
    role: 'Chief Medical Officer',
    qualification: 'MBBS, FCPS (Cardiology)',
    specialty: 'Cardiology',
    experience: '25+ years',
    image: '',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 2,
    name: 'Dr. Fatima Ali',
    role: 'Head of Surgery',
    qualification: 'MBBS, FRCS',
    specialty: 'General Surgery',
    experience: '20+ years',
    image: '',
    social: {
      facebook: '#',
      linkedin: '#'
    }
  },
  {
    id: 3,
    name: 'Dr. Muhammad Usman',
    role: 'Head of Neurology',
    qualification: 'MBBS, MD (Neurology)',
    specialty: 'Neurology',
    experience: '18+ years',
    image: '',
    social: {
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 4,
    name: 'Dr. Sara Ahmed',
    role: 'Head of Pediatrics',
    qualification: 'MBBS, DCH',
    specialty: 'Pediatrics',
    experience: '15+ years',
    image: '',
    social: {
      facebook: '#',
      linkedin: '#'
    }
  }
]

const achievements: Achievement[] = [
  {
    icon: 'fa-award',
    title: 'Best Hospital Award 2023',
    description: 'Recognized for excellence in patient care by Health Ministry'
  },
  {
    icon: 'fa-certificate',
    title: 'JCI Accreditation',
    description: 'International quality standards in healthcare'
  },
  {
    icon: 'fa-star',
    title: '5-Star Patient Rating',
    description: 'Consistently high patient satisfaction scores'
  },
  {
    icon: 'fa-flask',
    title: 'Research Excellence',
    description: 'Published 50+ research papers in medical journals'
  }
]

const facilities: Facility[] = [
  { name: 'ICU', icon: 'fa-heartbeat', color: 'bg-red-500' },
  { name: 'OT Complex', icon: 'fa-procedures', color: 'bg-blue-500' },
  { name: 'Radiology', icon: 'fa-x-ray', color: 'bg-purple-500' },
  { name: 'Laboratory', icon: 'fa-flask', color: 'bg-green-500' },
  { name: 'Pharmacy', icon: 'fa-pills', color: 'bg-yellow-500' },
  { name: 'Emergency', icon: 'fa-ambulance', color: 'bg-orange-500' },
  { name: 'Cardiology', icon: 'fa-heart', color: 'bg-pink-500' },
  { name: 'Neurology', icon: 'fa-brain', color: 'bg-indigo-500' }
]