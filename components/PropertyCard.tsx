'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Property } from '@/lib/properties'

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group h-full"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
        {/* Image Section with Gradient Background */}
        <div className="relative h-56 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 overflow-hidden">
          {/* Animated Background Blob */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 -right-4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>
          
          {/* Property Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-7xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {property.type === 'Land' && '🏞️'}
              {property.type === 'Villa' && '🏡'}
              {property.type === 'Estate' && '🏢'}
            </motion.div>
          </div>
          
          {/* Property Type Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-gray-800 shadow-lg border border-gray-200/50 group-hover:scale-105 transition-transform duration-300">
              {property.type}
            </span>
          </div>
          
          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-gray-200/50 group-hover:bg-white transition-all duration-300">
              <p className="text-gray-800 text-sm flex items-center font-semibold">
                <svg className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{property.location}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-blue-600 transition-all duration-300 min-h-[3.5rem]">
            {property.title}
          </h3>
          
          {/* Area Badge */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-3 rounded-xl border border-gray-100 group-hover:border-emerald-200 transition-colors duration-300">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="font-bold text-gray-900">{property.area}</span>
          </div>
          
          {/* View Details Button */}
          <Link
            href={`/properties/${property.slug}`}
            prefetch={true}
            className="mt-auto block w-full text-center px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-emerald-200/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group/button"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Details
              <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
