'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function LoanEligibilityClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/loan-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="bg-white">
      {/* Top Info Bar */}
      <div className="bg-gray-900 text-white py-3 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                India | USA | Dubai
              </span>
              <span className="px-3 py-1 bg-emerald-600 rounded-full text-xs">Online Support</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:info@mediestate.in" className="hover:text-emerald-400 transition">info@mediestate.in</a>
              <a href="tel:+919003252500" className="hover:text-emerald-400 transition">+91 9003252500</a>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-1.5 bg-emerald-600 rounded-full hover:bg-emerald-700 transition"
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-600 shadow-lg border border-emerald-100 mb-6">
              💰 Financial Solutions for Medical Professionals
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Loan Eligibility for<br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Medical Professionals
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Specialized loan products designed for doctors with competitive interest rates and flexible terms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Check Eligibility
              </button>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Call Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Home Loan Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Home Loan Eligibility</h2>
            <p className="text-gray-600 text-lg">Exclusive benefits for medical professionals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📊', title: 'Lowest Interest Rate', desc: '8.5% onwards' },
              { icon: '⚡', title: 'Fast Processing', desc: '7-10 working days' },
              { icon: '📅', title: 'Long Tenure', desc: 'Up to 30 years' },
              { icon: '📄', title: 'Less Documentation', desc: 'Minimal paperwork' },
              { icon: '🇮🇳', title: 'PAN India Service', desc: 'Available nationwide' },
              { icon: '🏦', title: 'All Lenders', desc: 'National & Private banks' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Doctors Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏥', title: 'Medical Professional Focus', desc: 'Specialized for doctors' },
              { icon: '💰', title: 'Competitive Rates', desc: 'Best interest rates' },
              { icon: '⚡', title: 'Quick Processing', desc: 'Fast approval' },
              { icon: '📋', title: 'Minimal Documentation', desc: 'Easy process' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MSME Loans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">MSME Loans for Doctors</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Micro, Small and Medium Enterprises (MSME) loans designed specifically for medical professionals to expand their practice
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Loan Type</th>
                  <th className="px-6 py-4 text-left">Loan Amount</th>
                  <th className="px-6 py-4 text-left">Collateral</th>
                  <th className="px-6 py-4 text-left">Interest Rate</th>
                  <th className="px-6 py-4 text-left">Repayment Tenure</th>
                  <th className="px-6 py-4 text-left">Processing Time</th>
                  <th className="px-6 py-4 text-left">Schemes Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">MSME Business Loan</td>
                  <td className="px-6 py-4">₹10L - ₹5Cr</td>
                  <td className="px-6 py-4">Required</td>
                  <td className="px-6 py-4">9.5% onwards</td>
                  <td className="px-6 py-4">Up to 10 years</td>
                  <td className="px-6 py-4">7-15 days</td>
                  <td className="px-6 py-4">SIDBI, MUDRA</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">Equipment Finance</td>
                  <td className="px-6 py-4">₹5L - ₹2Cr</td>
                  <td className="px-6 py-4">Equipment</td>
                  <td className="px-6 py-4">10% onwards</td>
                  <td className="px-6 py-4">Up to 7 years</td>
                  <td className="px-6 py-4">5-10 days</td>
                  <td className="px-6 py-4">All Banks</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">Working Capital</td>
                  <td className="px-6 py-4">₹5L - ₹1Cr</td>
                  <td className="px-6 py-4">Optional</td>
                  <td className="px-6 py-4">11% onwards</td>
                  <td className="px-6 py-4">Up to 5 years</td>
                  <td className="px-6 py-4">3-7 days</td>
                  <td className="px-6 py-4">MUDRA, Banks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Use Cases for MSME Loans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Setting up new clinic or hospital',
              'Purchase of medical equipment',
              'Clinic expansion and renovation',
              'Working capital for operations',
              'Hiring additional staff',
              'Technology upgrades',
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <span className="text-emerald-600 mr-3 text-xl">✓</span>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Lenders */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Top Lenders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {['SIDBI', 'HDFC Bank', 'ICICI Bank', 'Bajaj Finserv', 'Axis Bank', 'IDFC First', 'SBI'].map((lender, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{lender}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">MSME Loan Eligibility</h3>
              <ul className="space-y-3">
                {[
                  'Registered medical professional',
                  'Valid medical license',
                  'Minimum 2 years of practice',
                  'Good credit score (700+)',
                  'Business registration documents',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Home Loan Eligibility</h3>
              <ul className="space-y-3">
                {[
                  'Age: 21-65 years',
                  'Stable income proof',
                  'Good credit history',
                  'Valid identity documents',
                  'Property documents',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Documents Required</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Medical degree certificate',
                'Medical registration certificate',
                'PAN Card',
                'Aadhaar Card',
                'Bank statements (6 months)',
                'Income tax returns (2 years)',
                'Business registration proof',
                'Property documents (for home loan)',
              ].map((doc, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-emerald-600 mr-3 text-xl">✓</span>
                  <span className="text-gray-800">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-emerald-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Tips to Get Loan Easily</h3>
            <ul className="space-y-3">
              {[
                'Maintain a good credit score (750+)',
                'Keep all documents ready and organized',
                'Show stable income and practice history',
                'Apply through registered medical associations',
                'Compare offers from multiple lenders',
                'Read terms and conditions carefully',
              ].map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 mr-3 font-bold">{index + 1}.</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Apply for Your Loan?</h2>
          <p className="text-xl mb-8 opacity-90">Get in touch with our loan experts today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919003252500" className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300">
              Call Now
            </a>
            <a href="https://wa.me/919003252500" className="px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300">
              WhatsApp
            </a>
            <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h2>
          <p className="text-gray-600 text-center mb-8">Fill out the form and our team will get back to you within 24 hours</p>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="Dr. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  placeholder="Home Loan Inquiry"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-gray-900"
                  placeholder="Tell us about your loan requirements..."
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Submit Application'}
              </button>
            </div>

            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✅ Thank you! Your inquiry has been sent successfully. We'll contact you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
