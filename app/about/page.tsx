'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-600 mb-4">
              About Us
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About Medi Estate</h1>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Medi Estate is India's premier platform for medical real estate, connecting healthcare professionals 
              with premium properties designed specifically for medical facilities.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              We specialize in hospitals, clinics, diagnostic centers, and other healthcare facilities, 
              ensuring that every property meets the highest standards for medical operations.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-100 shadow-xl mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To revolutionize medical real estate by providing verified, premium properties that enable 
              healthcare providers to focus on what matters most - patient care.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <ul className="space-y-4">
              {[
                'Verified medical properties',
                'Prime locations with high footfall',
                'Complete legal documentation',
                'Expert consultation',
                'End-to-end support',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-lg text-gray-800"
                >
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></span>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
