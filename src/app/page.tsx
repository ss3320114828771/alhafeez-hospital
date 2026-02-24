"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500">
                <i className="fas fa-hospital text-white text-2xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Alhafeez
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'Doctors', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-white relative group text-lg"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="px-6 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-2xl"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              {['Home', 'About', 'Services', 'Doctors', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 text-gray-300 hover:text-white hover:bg-white/5 px-4 rounded-lg transition"
                >
                  {item}
                </button>
              ))}
              <div className="flex space-x-4 mt-4 pt-4 border-t border-white/20">
                <Link
                  href="/login"
                  className="flex-1 text-center px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background - Fixed with inline styles for animation delays */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Advanced Healthcare
                </span>
                <br />
                <span className="text-white">For Modern Lives</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0">
                Experience world-class medical care with cutting-edge technology and compassionate doctors at Alhafeez Hospital.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  <span>Get Started</span>
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </Link>
                
                <button
                  onClick={() => scrollToSection('about')}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span>Learn More</span>
                  <i className="fas fa-play ml-2 group-hover:scale-110 transition-transform"></i>
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">25+</div>
                  <div className="text-gray-400">Specialists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">5000+</div>
                  <div className="text-gray-400">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">15+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="n1.jpeg" 
                  alt="Alhafeez Hospital"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl animate-bounce">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">24/7 Emergency</div>
                    <div className="text-sm text-gray-300">Always Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Alhafeez Hospital?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine modern medical technology with compassionate care to provide the best healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-microscope',
                title: 'Modern Equipment',
                desc: 'State-of-the-art medical equipment and technology for accurate diagnosis and treatment.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: 'fa-user-md',
                title: 'Expert Doctors',
                desc: 'Highly qualified and experienced doctors dedicated to your health and well-being.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: 'fa-heartbeat',
                title: 'Emergency Care',
                desc: '24/7 emergency services with rapid response teams and modern ambulances.',
                color: 'from-green-500 to-teal-500'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                  <i className={`fas ${item.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Medical Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive healthcare services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'fa-heart', title: 'Cardiology', desc: 'Heart care' },
              { icon: 'fa-brain', title: 'Neurology', desc: 'Brain & nerves' },
              { icon: 'fa-bone', title: 'Orthopedics', desc: 'Bone & joints' },
              { icon: 'fa-child', title: 'Pediatrics', desc: 'Child care' },
              { icon: 'fa-female', title: 'Gynecology', desc: 'Women health' },
              { icon: 'fa-eye', title: 'Ophthalmology', desc: 'Eye care' },
              { icon: 'fa-tooth', title: 'Dental', desc: 'Dental care' },
              { icon: 'fa-lungs', title: 'Pulmonology', desc: 'Lung care' }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <i className={`fas ${service.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                Facilities
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Take a tour of our state-of-the-art medical facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={`n${num}.jpeg`}
                  alt={`Facility ${num}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1587351021759-${num}?auto=format&fit=crop&w=600&q=80`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In{' '}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to help and answer any questions you might have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'fa-map-marker-alt', title: 'Visit Us', info: 'Amin Pur Banglow, Faisalabad' },
              { icon: 'fa-phone-alt', title: 'Call Us', info: '+92 123 456789' },
              { icon: 'fa-envelope', title: 'Email Us', info: 'info@alhafeez.com' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${item.icon} text-white`}></i>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-hospital text-2xl text-blue-500"></i>
                <span className="text-xl font-bold">Alhafeez Hospital</span>
              </div>
              <p className="text-gray-400 text-sm">
                Providing advanced healthcare with compassion and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-blue-500 transition">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-blue-500 transition">About</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-500 transition">Services</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-blue-500 transition">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Emergency Care</li>
                <li>Cardiology</li>
                <li>Neurology</li>
                <li>Pediatrics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                  <i className="fab fa-facebook-f text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                  <i className="fab fa-instagram text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Alhafeez Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}