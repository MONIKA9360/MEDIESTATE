import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Medi Estate
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner for premium medical real estate solutions. Find the perfect space for your hospital, clinic, or diagnostic center.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/properties" className="block text-gray-300 hover:text-blue-400 transition">Properties</Link>
              <Link href="/about" className="block text-gray-300 hover:text-blue-400 transition">About Us</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-blue-400 transition">Contact</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Address</p>
                <p className="text-sm">7/C Sitra Road, Nehru Nagar</p>
                <p className="text-sm">Kalapatti Post, Coimbatore - 641 048</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Phone</p>
                <a href="tel:+919003252500" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 9003252500
                </a>
                <a href="tel:+919003130800" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 9003130800
                </a>
                <a href="tel:+971585758772" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Dubai: +971 58 575 8772
                </a>
                <a href="tel:+15623143323" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  USA: +1 562 314 3323
                </a>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email</p>
                <a href="mailto:info@mediestate.in" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@mediestate.in
                </a>
                <a href="mailto:agent@mediestate.in" className="flex items-center hover:text-emerald-400 transition text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  agent@mediestate.in
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; 2026 Medi Estate. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Developed by <a href="https://monika-777.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300">MONIKA M</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
