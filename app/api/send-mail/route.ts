import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactName, contactSubject, contactEmail, contactMessage } = body;

    // Validate required fields
    if (!contactName || !contactSubject || !contactEmail || !contactMessage) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Contact Form <noreply@54e.com>',
      to: ['simplelifesud@gmail.com'],
      subject: `New Contact Form Submission - ${contactSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; background: linear-gradient(to right, #6b46c1, #3182ce); -webkit-background-clip: text; background-clip: text; color: transparent;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #4a5568; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${contactEmail}</p>
            <p><strong>Subject:</strong> ${contactSubject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4a5568;">Message</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #6b46c1; border-radius: 4px;">
              ${contactMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px;">
            <p>This email was sent from the 54e contact form.</p>
            <p>Sent on: ${new Date().toLocaleString()}</p>
            <p style="color: #6b46c1; font-weight: bold;">54e - Tu evolución, nuestra prioridad.</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}