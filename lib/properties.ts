export interface Property {
  id: string
  slug: string
  title: string
  location: string
  price: string
  type: 'Land' | 'Villa' | 'Estate'
  area: string
  description: string
  features: string[]
  details: {
    size?: string
    zoning?: string
    ownership?: string
    availability?: string
    facing?: string
    roadWidth?: string
  }
  amenities: string[]
  nearbyFacilities: string[]
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'medical-land-chennai-premium',
    title: 'Premium Medical Land - Chennai',
    location: 'OMR, Chennai, Tamil Nadu',
    price: '₹12 Crore',
    type: 'Land',
    area: '2.5 Acres',
    description: 'Prime medical-use land in Chennai\'s fastest-growing healthcare corridor. Perfect for hospital, diagnostic center, or wellness facility development.',
    features: ['Medical Zoning', 'Corner Plot', 'Wide Road Access', 'Clear Title'],
    details: {
      size: '2.5 Acres (108,900 sq ft)',
      zoning: 'Medical/Commercial',
      ownership: 'Freehold',
      availability: 'Immediate',
      facing: 'East',
      roadWidth: '60 feet',
    },
    amenities: [
      'Medical Zoning Approved',
      'DTCP Approved Layout',
      'Underground Drainage',
      'Water & Electricity Connection',
      'Compound Wall',
      'Security Gate',
    ],
    nearbyFacilities: [
      'Metro Station - 2km',
      'IT Park - 3km',
      'Residential Area - 1km',
      'Airport - 15km',
    ],
  },
  {
    id: '2',
    slug: 'wellness-villa-bangalore-luxury',
    title: 'Luxury Wellness Villa - Bangalore',
    location: 'Whitefield, Bangalore, Karnataka',
    price: '₹8.5 Crore',
    type: 'Villa',
    area: '8,500 sq ft',
    description: 'Exquisite wellness villa designed for holistic healthcare practice. Features meditation spaces, therapy rooms, and healing gardens.',
    features: ['5 Therapy Rooms', 'Meditation Garden', 'Parking for 15', 'Modern Architecture'],
    details: {
      size: '8,500 sq ft Built-up',
      zoning: 'Residential/Commercial',
      ownership: 'Freehold',
      availability: 'Ready to Move',
      facing: 'North',
      roadWidth: '40 feet',
    },
    amenities: [
      '5 Spacious Therapy Rooms',
      'Reception & Waiting Lounge',
      'Meditation Garden',
      'Healing Water Feature',
      'Staff Quarters',
      'Ample Parking',
      'Solar Power Backup',
      'Rainwater Harvesting',
    ],
    nearbyFacilities: [
      'Tech Park - 1km',
      'Residential Complex - 500m',
      'Shopping Mall - 2km',
      'Hospital - 3km',
    ],
  },
  {
    id: '3',
    slug: 'healthcare-estate-mumbai',
    title: 'Healthcare Commercial Estate',
    location: 'Andheri, Mumbai, Maharashtra',
    price: '₹25 Crore',
    type: 'Estate',
    area: '5 Acres',
    description: 'Premium healthcare commercial estate ideal for multi-specialty hospital, medical college, or integrated wellness center development.',
    features: ['5 Acres', 'Medical Zoning', 'Metro Connectivity', 'High FSI'],
    details: {
      size: '5 Acres (217,800 sq ft)',
      zoning: 'Medical/Institutional',
      ownership: 'Freehold',
      availability: 'Immediate',
      facing: 'West',
      roadWidth: '80 feet',
    },
    amenities: [
      'Medical Zoning Approved',
      'High FSI (Floor Space Index)',
      'Metro Station Adjacent',
      'Underground Utilities',
      'Boundary Wall',
      'Security Infrastructure',
      'Landscaping Ready',
    ],
    nearbyFacilities: [
      'Metro Station - 200m',
      'Railway Station - 2km',
      'Airport - 8km',
      'Medical College - 3km',
    ],
  },
  {
    id: '4',
    slug: 'medical-land-hyderabad-hitech',
    title: 'Medical Land - Hitech City',
    location: 'Hitech City, Hyderabad, Telangana',
    price: '₹18 Crore',
    type: 'Land',
    area: '3 Acres',
    description: 'Strategic medical land in Hyderabad\'s IT corridor. Ideal for corporate wellness center, diagnostic facility, or specialty hospital.',
    features: ['IT Corridor', 'High Visibility', 'Corner Plot', 'Medical Zoning'],
    details: {
      size: '3 Acres (130,680 sq ft)',
      zoning: 'Medical/Commercial',
      ownership: 'Freehold',
      availability: 'Immediate',
      facing: 'North-East',
      roadWidth: '80 feet',
    },
    amenities: [
      'Medical Zoning Approved',
      'HMDA Approved',
      'High Visibility Location',
      'Wide Road Frontage',
      'Utilities Available',
      'Gated Community Adjacent',
    ],
    nearbyFacilities: [
      'IT Companies - 1km',
      'Metro Station - 1.5km',
      'International Airport - 20km',
      'Shopping Malls - 2km',
    ],
  },
  {
    id: '5',
    slug: 'wellness-villa-goa-beachfront',
    title: 'Beachfront Wellness Villa - Goa',
    location: 'Candolim, Goa',
    price: '₹15 Crore',
    type: 'Villa',
    area: '12,000 sq ft',
    description: 'Exclusive beachfront wellness villa perfect for luxury rehabilitation center, yoga retreat, or holistic healing facility.',
    features: ['Beachfront', 'Sea View', '10 Treatment Rooms', 'Infinity Pool'],
    details: {
      size: '12,000 sq ft Built-up',
      zoning: 'Residential/Hospitality',
      ownership: 'Freehold',
      availability: 'Ready to Move',
      facing: 'West (Sea Facing)',
      roadWidth: '30 feet',
    },
    amenities: [
      '10 Luxury Treatment Rooms',
      'Infinity Pool with Sea View',
      'Yoga & Meditation Deck',
      'Organic Garden',
      'Spa Facilities',
      'Private Beach Access',
      'Staff Accommodation',
      'Backup Generator',
    ],
    nearbyFacilities: [
      'Beach - Direct Access',
      'Airport - 35km',
      'Tourist Area - 2km',
      'Hospital - 5km',
    ],
  },
  {
    id: '6',
    slug: 'medical-land-pune-kharadi',
    title: 'Medical Land - Kharadi IT Park',
    location: 'Kharadi, Pune, Maharashtra',
    price: '₹10 Crore',
    type: 'Land',
    area: '1.5 Acres',
    description: 'Premium medical land near IT parks and residential complexes. Perfect for polyclinic, diagnostic center, or wellness facility.',
    features: ['IT Park Adjacent', 'High Footfall', 'Medical Zoning', 'Clear Title'],
    details: {
      size: '1.5 Acres (65,340 sq ft)',
      zoning: 'Medical/Commercial',
      ownership: 'Freehold',
      availability: 'Immediate',
      facing: 'South',
      roadWidth: '60 feet',
    },
    amenities: [
      'Medical Zoning Approved',
      'PMC Approved',
      'High Density Area',
      'All Utilities Available',
      'Wide Road Access',
      'Public Transport',
    ],
    nearbyFacilities: [
      'IT Parks - 500m',
      'Residential Towers - 1km',
      'Metro Station - 2km',
      'Shopping Complex - 1.5km',
    ],
  },
]

export function getPropertyBySlug(slug: string) {
  return properties.find(p => p.slug === slug)
}
