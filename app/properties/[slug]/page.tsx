import { notFound } from 'next/navigation'
import { getPropertyBySlug, properties } from '@/lib/properties'
import PropertyDetailClient from './PropertyDetailClient'

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetailClient property={property} />
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }))
}
