import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

export async function sendAdminNotification(lead: any) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: '🏥 New Lead - Medi Estate',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lead Notification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">Medi Estate</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">New Lead Received</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #667eea; font-size: 24px;">Lead Details</h2>
                        
                        <table width="100%" cellpadding="10" cellspacing="0">
                          <tr>
                            <td style="color: #666; font-weight: bold; width: 40%;">👤 Name:</td>
                            <td style="color: #333; font-weight: 600;">${lead.name}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">📧 Email:</td>
                            <td style="color: #333; font-weight: 600;">${lead.email}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">📱 Phone:</td>
                            <td style="color: #333; font-weight: 600;">${lead.phone}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">🏥 Property ID:</td>
                            <td style="color: #333; font-weight: 600;">${lead.propertyId || 'General Inquiry'}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">💬 Message:</h3>
                        <p style="margin: 0; color: #666; line-height: 1.6;">${lead.message}</p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; color: #999; font-size: 14px;">© 2026 Medi Estate. All rights reserved.</p>
                      <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">This is an automated notification from your CRM system.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('✅ Admin notification sent successfully')
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error)
    throw error
  }
}

export async function sendLoanAdminNotification(loanLead: any) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: '💰 New Loan Inquiry - Medi Estate',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Loan Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">Medi Estate</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">New Loan Inquiry Received</p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%); border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #10b981; font-size: 24px;">Loan Inquiry Details</h2>
                        
                        <table width="100%" cellpadding="10" cellspacing="0">
                          <tr>
                            <td style="color: #666; font-weight: bold; width: 40%;">👤 Name:</td>
                            <td style="color: #333; font-weight: 600;">${loanLead.name}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">📧 Email:</td>
                            <td style="color: #333; font-weight: 600;">${loanLead.email}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">📱 Phone:</td>
                            <td style="color: #333; font-weight: 600;">${loanLead.phone}</td>
                          </tr>
                          <tr>
                            <td style="color: #666; font-weight: bold;">📋 Subject:</td>
                            <td style="color: #333; font-weight: 600;">${loanLead.subject}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="background: #f8f9fa; border-left: 4px solid #10b981; padding: 20px; border-radius: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">💬 Message:</h3>
                        <p style="margin: 0; color: #666; line-height: 1.6;">${loanLead.message}</p>
                      </div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; color: #999; font-size: 14px;">© 2026 Medi Estate. All rights reserved.</p>
                      <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">This is an automated notification from your CRM system.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('✅ Loan admin notification sent successfully')
  } catch (error) {
    console.error('❌ Failed to send loan admin notification:', error)
    throw error
  }
}

export async function sendLoanUserConfirmation(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: '✅ Thank You for Your Loan Inquiry - Medi Estate',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">Medi Estate</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Loan Eligibility Services</p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <div style="text-align: center; margin-bottom: 30px;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); width: 80px; height: 80px; border-radius: 50%; line-height: 80px; font-size: 40px;">
                          ✅
                        </div>
                      </div>
                      
                      <h2 style="margin: 0 0 20px 0; color: #333; font-size: 28px; text-align: center;">Thank You, ${name}!</h2>
                      
                      <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.8; text-align: center;">
                        We've received your loan inquiry and appreciate your interest in our financial services for medical professionals.
                      </p>
                      
                      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%); border-radius: 15px; padding: 30px; margin: 30px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #10b981; font-size: 20px; text-align: center;">What Happens Next?</h3>
                        <table width="100%" cellpadding="15" cellspacing="0">
                          <tr>
                            <td style="text-align: center;">
                              <div style="font-size: 30px; margin-bottom: 10px;">📞</div>
                              <p style="margin: 0; color: #333; font-weight: 600;">Our loan expert will contact you</p>
                              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Within 24 hours</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="text-align: center;">
                              <div style="font-size: 30px; margin-bottom: 10px;">💰</div>
                              <p style="margin: 0; color: #333; font-weight: 600;">Loan eligibility assessment</p>
                              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Personalized consultation</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="text-align: center; margin-top: 30px;">
                        <a href="tel:+919003252500" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 30px; font-weight: bold; font-size: 16px;">Call Us: +91 9003252500</a>
                      </div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 10px 0; color: #333; font-weight: 600;">Contact Us</p>
                      <p style="margin: 0; color: #666; font-size: 14px;">📧 info@mediestate.in | 📱 +91 9003252500</p>
                      <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">© 2026 Medi Estate. All rights reserved.</p>
                      <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">Developed by MONIKA M</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('✅ Loan user confirmation sent successfully to:', email)
  } catch (error) {
    console.error('❌ Failed to send loan user confirmation:', error)
    throw error
  }
}

export async function sendUserConfirmation(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: '✅ Thank You for Contacting Medi Estate',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">Medi Estate</h1>
                      <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Premium Medical Properties</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <div style="text-align: center; margin-bottom: 30px;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 80px; height: 80px; border-radius: 50%; line-height: 80px; font-size: 40px;">
                          ✅
                        </div>
                      </div>
                      
                      <h2 style="margin: 0 0 20px 0; color: #333; font-size: 28px; text-align: center;">Thank You, ${name}!</h2>
                      
                      <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.8; text-align: center;">
                        We've received your inquiry and appreciate your interest in our premium medical properties.
                      </p>
                      
                      <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 15px; padding: 30px; margin: 30px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 20px; text-align: center;">What Happens Next?</h3>
                        <table width="100%" cellpadding="15" cellspacing="0">
                          <tr>
                            <td style="text-align: center;">
                              <div style="font-size: 30px; margin-bottom: 10px;">📞</div>
                              <p style="margin: 0; color: #333; font-weight: 600;">Our team will contact you</p>
                              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Within 24 hours</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="text-align: center;">
                              <div style="font-size: 30px; margin-bottom: 10px;">🏥</div>
                              <p style="margin: 0; color: #333; font-weight: 600;">Property details & site visit</p>
                              <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Personalized consultation</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:3000/properties" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 30px; font-weight: bold; font-size: 16px;">Browse More Properties</a>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 10px 0; color: #333; font-weight: 600;">Contact Us</p>
                      <p style="margin: 0; color: #666; font-size: 14px;">📧 info@mediestate.com | 📱 +91 1234567890</p>
                      <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">© 2026 Medi Estate. All rights reserved.</p>
                      <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">Developed by MONIKA M</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('✅ User confirmation sent successfully to:', email)
  } catch (error) {
    console.error('❌ Failed to send user confirmation:', error)
    throw error
  }
}
