import Hero from '@/components/Hero'
import PropertyCard from '@/components/PropertyCard'
import { properties } from '@/lib/properties'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full text-sm font-bold text-gray-700 mb-4 border border-gray-200">
            Featured Properties
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Medical Properties
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of medical land, wellness villas, and healthcare estates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/properties"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Medi Estate?
            </h2>
            <p className="text-gray-600 text-lg">
              Your trusted partner in luxury medical real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Premium Locations',
                desc: 'Exclusive medical land and estates in India\'s most prestigious healthcare corridors'
              },
              {
                icon: '✅',
                title: 'Verified Properties',
                desc: 'All properties thoroughly verified with complete legal documentation and clear titles'
              },
              {
                icon: '🤝',
                title: 'Expert Guidance',
                desc: 'Dedicated team of real estate professionals specializing in medical properties'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:scale-105 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Invest in Medical Real Estate?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get in touch with our team today and discover premium medical land and estates
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </>
  )
}
