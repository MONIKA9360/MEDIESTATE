import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, propertyId } = body

    console.log('📝 Creating lead for:', email)

    const lead = await prisma.lead.create({
      data: { name, email, phone, message, propertyId },
    })

    console.log('✅ Lead created successfully:', lead.id)

    // Try to send emails
    try {
      console.log('📧 Attempting to send emails...')
      await sendAdminNotification(lead)
      await sendUserConfirmation(email, name)
      console.log('✅ All emails sent successfully')
    } catch (emailError: any) {
      console.error('❌ Email error (lead saved):', emailError.message)
      // Lead is saved, just log the email error
    }

    return NextResponse.json({ success: true, lead })
  } catch (error: any) {
    console.error('❌ Error creating lead:', error.message)
    return NextResponse.json({ error: 'Failed to create lead', details: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.lead.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
