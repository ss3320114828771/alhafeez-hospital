'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Background images for slideshow
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1920&q=80',
      title: 'Advanced Healthcare',
      subtitle: 'State-of-the-art medical facilities'
    },
    {
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
      title: 'Expert Doctors',
      subtitle: 'Experienced medical professionals'
    },
    {
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80',
      title: 'Modern Equipment',
      subtitle: 'Cutting-edge medical technology'
    }
  ]

  // Auto-rotate slides
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Stats data
  const stats = [
    { value: '25+', label: 'Years Experience', icon: 'fa-calendar' },
    { value: '50K+', label: 'Happy Patients', icon: 'fa-smile' },
    { value: '200+', label: 'Expert Doctors', icon: 'fa-user-md' },
    { value: '24/7', label: 'Emergency Care', icon: 'fa-ambulance' }
  ]

  if (!mounted) {
    return (
      <div className="relative h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gray-800"></div>
      </div>
    )
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Slide Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
              <br />
              <span className="text-white">for Better Life</span>
            </h1>

            {/* Slide Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/appointment"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-105"
              >
                <span>Book Appointment</span>
                <i className="fas fa-calendar-check ml-2 group-hover:scale-110 transition"></i>
              </Link>

              <Link
                href="#about"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                <span>Learn More</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition"></i>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center justify-center">
                    <i className={`fas ${stat.icon} mr-2 text-blue-400`}></i>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'w-10 bg-blue-500'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <a
          href="#about"
          className="flex flex-col items-center text-white/60 hover:text-white transition"
        >
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  )
}