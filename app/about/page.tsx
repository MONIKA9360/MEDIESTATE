'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-full text-sm font-bold text-gray-800 mb-6 border border-gray-200 shadow-sm"
            >
              About Medi Estate
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-900 bg-clip-text text-transparent">
                Your Trusted Partner in Medical Real Estate
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting healthcare professionals with premium properties across India, USA, and Dubai
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl border border-gray-200 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Medi Estate is India's premier platform for medical real estate, specializing in premium land, wellness villas, and healthcare estates designed specifically for medical professionals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a presence in India, USA, and Dubai, we connect doctors, healthcare providers, and medical institutions with verified properties that meet the highest standards for medical operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-200 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To revolutionize medical real estate by providing verified, premium properties that enable healthcare providers to focus on what matters most - patient care.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to be the most trusted partner for medical professionals seeking land, villas, or estates for hospitals, clinics, diagnostic centers, and wellness facilities.
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-12 mb-16 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">6</div>
                <div className="text-lg opacity-90">Premium Properties</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">6+</div>
                <div className="text-lg opacity-90">Cities Covered</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">Acres of Land</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">3</div>
                <div className="text-lg opacity-90">Countries</div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Why Choose Medi Estate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '✓',
                  title: 'Verified Properties',
                  desc: 'All properties thoroughly verified with complete legal documentation and clear titles'
                },
                {
                  icon: '🏆',
                  title: 'Premium Locations',
                  desc: 'Exclusive medical land and estates in India\'s most prestigious healthcare corridors'
                },
                {
                  icon: '🌍',
                  title: 'Global Presence',
                  desc: 'Properties available in India, USA, and Dubai for international medical professionals'
                },
                {
                  icon: '💼',
                  title: 'Expert Consultation',
                  desc: 'Dedicated team of real estate professionals specializing in medical properties'
                },
                {
                  icon: '📋',
                  title: 'Complete Documentation',
                  desc: 'End-to-end support with legal paperwork, zoning approvals, and compliance'
                },
                {
                  icon: '🤝',
                  title: 'Trusted Partner',
                  desc: 'Committed to helping healthcare providers find their perfect property'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-12 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">Property Services</h3>
                <ul className="space-y-3">
                  {[
                    'Medical Land Sales',
                    'Wellness Villa Listings',
                    'Healthcare Estate Development',
                    'Property Consultation',
                    'Site Visits & Tours',
                    'Investment Advisory',
                  ].map((service, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                      <span className="font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Financial Services</h3>
                <ul className="space-y-3">
                  {[
                    'Home Loan Assistance',
                    'MSME Loan Support',
                    'Loan Eligibility Check',
                    'Financial Planning',
                    'EMI Calculators',
                    'Lender Connections',
                  ].map((service, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      <span className="font-medium">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
            <p className="text-xl mb-8 opacity-90">Get in touch with our team today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Contact Us
              </a>
              <a
                href="/properties"
                className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                View Properties
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
