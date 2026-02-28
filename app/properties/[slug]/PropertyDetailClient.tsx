'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import type { Property } from '@/lib/properties'

const gradients = {
  Land: 'from-emerald-500 to-teal-600',
  Villa: 'from-blue-500 to-purple-600',
  Estate: 'from-purple-500 to-pink-600',
}

export default function PropertyDetailClient({ property }: { property: Property }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 py-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Hero Section with Gradient */}
          <div className={`bg-gradient-to-br ${gradients[property.type]} rounded-3xl p-12 mb-8 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {property.type}
                </span>
                <span className="text-6xl">
                  {property.type === 'Land' && '🏞️'}
                  {property.type === 'Villa' && '🏡'}
                  {property.type === 'Estate' && '🏢'}
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4">{property.title}</h1>
              <p className="text-xl mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location}
              </p>
              <p className="text-6xl font-bold">{property.price}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl mb-12 p-8">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full font-semibold">{property.area}</span>
            </div>
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{property.description}</p>
            
            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-100 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-emerald-700">Property Details</h3>
                <div className="space-y-3">
                  {property.details.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Size:</span>
                      <span className="font-bold text-gray-900">{property.details.size}</span>
                    </div>
                  )}
                  {property.details.zoning && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Zoning:</span>
                      <span className="font-bold text-gray-900">{property.details.zoning}</span>
                    </div>
                  )}
                  {property.details.ownership && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Ownership:</span>
                      <span className="font-bold text-gray-900">{property.details.ownership}</span>
                    </div>
                  )}
                  {property.details.facing && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Facing:</span>
                      <span className="font-bold text-gray-900">{property.details.facing}</span>
                    </div>
                  )}
                  {property.details.roadWidth && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Road Width:</span>
                      <span className="font-bold text-gray-900">{property.details.roadWidth}</span>
                    </div>
                  )}
                  {property.details.availability && (
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Availability:</span>
                      <span className="font-bold text-green-600">{property.details.availability}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-700">Key Features</h3>
                <ul className="space-y-3">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-800">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-2xl border border-blue-100 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Amenities & Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span className="text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Facilities */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-purple-700">Nearby Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.nearbyFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">📍</span>
                    <span className="text-gray-800">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm propertyId={property.id} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
