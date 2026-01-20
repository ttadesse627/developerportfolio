import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/components/ContactEmail';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.PERSONAL_EMAIL!],
      replyTo: email,
      subject: subject ? `Portfolio: ${subject}` : `New message from ${name}`,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`,
      react: ContactEmail({ 
        name, 
        email, 
        subject, 
        message 
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        data 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}