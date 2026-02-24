'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ]

  const services = [
    { name: 'Emergency Care', icon: 'fa-ambulance' },
    { name: 'Cardiology', icon: 'fa-heart' },
    { name: 'Neurology', icon: 'fa-brain' },
    { name: 'Pediatrics', icon: 'fa-child' },
    { name: 'Orthopedics', icon: 'fa-bone' },
    { name: 'Laboratory', icon: 'fa-flask' }
  ]

  const contactInfo = [
    { icon: 'fa-map-marker-alt', text: 'Amin Pur Banglow, Faisalabad, Pakistan' },
    { icon: 'fa-phone-alt', text: '+92 123 456789' },
    { icon: 'fa-phone-alt', text: '+92 987 654321' },
    { icon: 'fa-envelope', text: 'info@alhafeez.com' },
    { icon: 'fa-envelope', text: 'emergency@alhafeez.com' }
  ]

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
    { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
    { icon: 'fab fa-youtube', href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-hospital text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-white">Alhafeez</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Providing quality healthcare with compassion and cutting-edge technology since 2000.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition flex items-center"
                  >
                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={`/services#${service.name.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition flex items-center"
                  >
                    <i className={`fas ${service.icon} text-xs mr-2 w-4`}></i>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <i className={`fas ${info.icon} text-blue-400 mt-1`}></i>
                  <span className="text-gray-400 text-sm">{info.text}</span>
                </li>
              ))}
            </ul>

            {/* Emergency Badge */}
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <i className="fas fa-phone-alt text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-red-400 text-xs">Emergency 24/7</p>
                  <p className="text-white text-sm font-semibold">+92 123 456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-semibold mb-1">Subscribe to our Newsletter</h4>
              <p className="text-gray-400 text-sm">Get latest updates and health tips</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:shadow-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-gray-400 text-center md:text-left mb-2 md:mb-0">
              © {currentYear} Alhafeez Hospital. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}