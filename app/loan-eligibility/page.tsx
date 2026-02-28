import { Metadata } from 'next'
import LoanEligibilityClient from './LoanEligibilityClient'

export const metadata: Metadata = {
  title: 'Loan Eligibility - Home Loans & MSME Loans for Doctors | Medi Estate',
  description: 'Specialized loan products for medical professionals. Get home loans and MSME loans with competitive interest rates, fast processing, and minimal documentation.',
  keywords: ['doctor loans', 'medical professional loans', 'home loans for doctors', 'MSME loans', 'clinic loans'],
  openGraph: {
    title: 'Loan Eligibility for Medical Professionals | Medi Estate',
    description: 'Specialized loan products designed for doctors with competitive interest rates and flexible terms.',
    type: 'website',
  },
}

export default function LoanEligibilityPage() {
  return <LoanEligibilityClient />
}
