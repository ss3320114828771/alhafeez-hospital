'use client'

import { useState } from 'react'

interface GalleryImage {
  id: number
  src: string
  title: string
  category: string
  description: string
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const categories = [
    { id: 'all', name: 'All Photos', icon: 'fa-images' },
    { id: 'facility', name: 'Facilities', icon: 'fa-building' },
    { id: 'operation', name: 'Operation Theaters', icon: 'fa-procedures' },
    { id: 'icu', name: 'ICU', icon: 'fa-heartbeat' },
    { id: 'lab', name: 'Laboratory', icon: 'fa-flask' },
    { id: 'patient', name: 'Patient Rooms', icon: 'fa-bed' }
  ]

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/n1.jpeg',
      title: 'Main Hospital Building',
      category: 'facility',
      description: 'State-of-the-art hospital facility with modern architecture'
    },
    {
      id: 2,
      src: 'n2.jpeg',
      title: 'Operation Theater',
      category: 'operation',
      description: 'Advanced operation theater with latest equipment'
    },
    {
      id: 3,
      src: 'n3.jpeg',
      title: 'ICU Unit',
      category: 'icu',
      description: 'Intensive Care Unit with modern monitoring systems'
    },
    {
      id: 4,
      src: 'n4.jpeg',
      title: 'Diagnostic Laboratory',
      category: 'lab',
      description: 'Fully equipped laboratory for accurate diagnostics'
    },
    {
      id: 5,
      src: 'n5.jpeg',
      title: 'Patient Room',
      category: 'patient',
      description: 'Comfortable patient rooms with modern amenities'
    },
    {
      id: 6,
      src: 'n6.jpeg',
      title: 'Emergency Department',
      category: 'facility',
      description: '24/7 emergency department with rapid response'
    },
    {
      id: 7,
      src: 'n1.jpeg',
      title: 'Cardiology Wing',
      category: 'facility',
      description: 'Specialized cardiology department'
    },
    {
      id: 8,
      src: 'n2.jpeg',
      title: 'Radiology Department',
      category: 'lab',
      description: 'Advanced imaging and radiology services'
    },
    {
      id: 9,
      src: 'n3.jpeg',
      title: 'Surgical Suite',
      category: 'operation',
      description: 'Modern surgical suites for complex procedures'
    }
  ]

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  // Fallback image URLs if local images don't exist
  const fallbackImages = [
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  ]

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length)
    e.currentTarget.src = fallbackImages[randomIndex]
  }

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Take a tour of our state-of-the-art medical facilities
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <i className={`fas ${category.icon} text-sm`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                onError={handleImageError}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                  
                  {/* Category Badge */}
                  <div className="flex items-center mt-3">
                    <span className="px-3 py-1 bg-blue-600/50 backdrop-blur-sm text-white text-xs rounded-full">
                      {categories.find(c => c.id === image.category)?.name || image.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <i className="fas fa-search-plus text-white"></i>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View All Photos
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onError={handleImageError}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-2xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
                setSelectedImage(filteredImages[prevIndex])
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <i className="fas fa-chevron-left text-white text-xl"></i>
            </button>

            <button
              onClick={() => {
                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
                setSelectedImage(filteredImages[nextIndex])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <i className="fas fa-chevron-right text-white text-xl"></i>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
              {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}