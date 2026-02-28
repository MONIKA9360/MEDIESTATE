import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendLoanAdminNotification, sendLoanUserConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    console.log('📝 Creating loan lead for:', email)

    const loanLead = await prisma.loanLead.create({
      data: { name, email, phone, subject, message },
    })

    console.log('✅ Loan lead created successfully:', loanLead.id)

    // Try to send emails
    try {
      console.log('📧 Attempting to send emails...')
      await sendLoanAdminNotification(loanLead)
      await sendLoanUserConfirmation(email, name)
      console.log('✅ All emails sent successfully')
    } catch (emailError: any) {
      console.error('❌ Email error (lead saved):', emailError.message)
    }

    return NextResponse.json({ success: true, loanLead })
  } catch (error: any) {
    console.error('❌ Error creating loan lead:', error.message)
    return NextResponse.json({ error: 'Failed to create loan lead', details: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const loanLeads = await prisma.loanLead.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ leads: loanLeads })
  } catch (error) {
    console.error('Error fetching loan leads:', error)
    return NextResponse.json({ error: 'Failed to fetch loan leads' }, { status: 500 })
  }
}
