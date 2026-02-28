import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medi Estate - Premium Medical Land & Wellness Estates',
  description: 'Discover luxury medical land, wellness villas, and healthcare estates in India. Premium real estate for medical and wellness development.',
  keywords: ['medical land', 'wellness villa', 'healthcare estate', 'medical real estate', 'clinic land', 'hospital land'],
  openGraph: {
    title: 'Medi Estate - Premium Medical Land & Wellness Estates',
    description: 'Discover luxury medical land, wellness villas, and healthcare estates in India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
