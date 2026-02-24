'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Service {
  id: number
  icon: string
  title: string
  description: string
  longDescription: string
  features: string[]
  color: string
  bgColor: string
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const services: Service[] = [
    {
      id: 1,
      icon: 'fa-heart',
      title: 'Cardiology',
      description: 'Advanced heart care with modern technology',
      longDescription: 'Our cardiology department offers comprehensive heart care including diagnostics, interventions, and rehabilitation. We have state-of-the-art cath labs and experienced cardiologists.',
      features: ['Echocardiography', 'Stress Testing', 'Angioplasty', 'Heart Surgery'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 2,
      icon: 'fa-brain',
      title: 'Neurology',
      description: 'Expert care for brain and nervous system',
      longDescription: 'Our neurology department provides comprehensive care for disorders of the brain and nervous system. We have advanced diagnostic tools and treatment options.',
      features: ['Stroke Care', 'Epilepsy Treatment', 'Movement Disorders', 'Headache Management'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 3,
      icon: 'fa-bone',
      title: 'Orthopedics',
      description: 'Complete bone and joint care',
      longDescription: 'Our orthopedics department specializes in the diagnosis and treatment of musculoskeletal conditions. We offer both surgical and non-surgical treatments.',
      features: ['Joint Replacement', 'Sports Medicine', 'Trauma Care', 'Spine Surgery'],
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 4,
      icon: 'fa-child',
      title: 'Pediatrics',
      description: 'Specialized care for children',
      longDescription: 'Our pediatrics department provides comprehensive healthcare for children from infancy through adolescence. We have child-friendly facilities and experienced pediatricians.',
      features: ['Newborn Care', 'Vaccinations', 'Growth Monitoring', 'Child Development'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 5,
      icon: 'fa-female',
      title: 'Gynecology',
      description: 'Complete women\'s health services',
      longDescription: 'Our gynecology department offers comprehensive healthcare services for women at all stages of life. We provide compassionate and personalized care.',
      features: ['Prenatal Care', 'Family Planning', 'Menopause Management', 'Cancer Screening'],
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      id: 6,
      icon: 'fa-eye',
      title: 'Ophthalmology',
      description: 'Advanced eye care and surgery',
      longDescription: 'Our ophthalmology department provides comprehensive eye care including diagnosis, treatment, and surgery for various eye conditions.',
      features: ['Cataract Surgery', 'Glaucoma Care', 'Retina Services', 'Pediatric Eye Care'],
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 7,
      icon: 'fa-tooth',
      title: 'Dental Care',
      description: 'Complete dental services',
      longDescription: 'Our dental department offers comprehensive oral healthcare including preventive, restorative, and cosmetic dentistry.',
      features: ['Teeth Cleaning', 'Root Canal', 'Dental Implants', 'Orthodontics'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 8,
      icon: 'fa-lungs',
      title: 'Pulmonology',
      description: 'Expert respiratory care',
      longDescription: 'Our pulmonology department specializes in the diagnosis and treatment of lung and respiratory disorders.',
      features: ['Asthma Care', 'COPD Management', 'Sleep Studies', 'Pulmonary Function'],
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      id: 9,
      icon: 'fa-stethoscope',
      title: 'General Medicine',
      description: 'Comprehensive primary care',
      longDescription: 'Our general medicine department provides comprehensive primary healthcare services for patients of all ages.',
      features: ['Health Checkups', 'Disease Prevention', 'Chronic Disease Management', 'Acute Care'],
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10'
    }
  ]

  const emergencyServices = [
    { icon: 'fa-ambulance', title: '24/7 Emergency', description: 'Round-the-clock emergency services' },
    { icon: 'fa-truck-medical', title: 'Ambulance Service', description: 'Fast response ambulance' },
    { icon: 'fa-flask', title: 'Lab Services', description: '24/7 diagnostic laboratory' },
    { icon: 'fa-x-ray', title: 'Radiology', description: 'Advanced imaging services' }
  ]

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Medical Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive healthcare services tailored to your needs
          </p>
        </div>

        {/* Emergency Services Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-ambulance text-white text-3xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Emergency 24/7</h3>
                <p className="text-white/80">Immediate medical attention when you need it most</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">+92 123 456789</div>
                <p className="text-white/80 text-sm">Call for emergency</p>
              </div>
              <Link
                href="/emergency"
                className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Help Now
              </Link>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <i className={`fas ${service.icon} text-3xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}></i>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>

              {/* Features Preview */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
                {service.features.length > 2 && (
                  <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                    +{service.features.length - 2} more
                  </span>
                )}
              </div>

              {/* Learn More Link */}
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                <span>Learn More</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Emergency Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {emergencyServices.map((service, index) => (
            <div key={index} className="bg-gray-800/30 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className={`fas ${service.icon} text-red-500 text-xl`}></i>
              </div>
              <h4 className="text-white text-sm font-medium mb-1">{service.title}</h4>
              <p className="text-gray-400 text-xs">{service.description}</p>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View All Services
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${selectedService.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <i className={`fas ${selectedService.icon} text-white text-3xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                    <p className="text-white/80">{selectedService.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-white/80 hover:text-white transition"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-300 mb-6">{selectedService.longDescription}</p>

              <h4 className="text-white font-semibold mb-3">Services Include:</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {selectedService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-check text-green-500 text-xs"></i>
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Appointment Button */}
              <Link
                href={`/appointment?service=${selectedService.id}`}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition"
                onClick={() => setSelectedService(null)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}