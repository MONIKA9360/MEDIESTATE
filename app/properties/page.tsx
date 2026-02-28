import { Metadata } from 'next'
import PropertyCard from '@/components/PropertyCard'
import { properties } from '@/lib/properties'
import PropertiesContent from './PropertiesContent'

export const metadata: Metadata = {
  title: 'Medical Properties - Land, Villas & Estates | Medi Estate',
  description: 'Browse premium medical land, wellness villas, and healthcare estates across India. Find the perfect property for your medical facility.',
  keywords: ['medical land', 'wellness villa', 'healthcare estate', 'medical property', 'clinic land'],
}

export default function PropertiesPage() {
  return <PropertiesContent />
}
