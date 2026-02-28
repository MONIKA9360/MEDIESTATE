'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Medi Estate
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</Link>
            <Link href="/properties" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Properties</Link>
            <Link href="/loan-eligibility" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Loan Eligibility</Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
              Contact Us
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">Home</Link>
            <Link href="/properties" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">Properties</Link>
            <Link href="/loan-eligibility" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">Loan Eligibility</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">About</Link>
            <Link href="/contact" className="block px-3 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg text-center">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
