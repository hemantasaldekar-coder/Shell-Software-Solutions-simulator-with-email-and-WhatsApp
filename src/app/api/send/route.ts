import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, branches, manualHours, teamSize, score } = body;

    // Basic Validation
    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email using Resend
    // NOTE: On the free tier without a custom domain, the 'from' email MUST be 'onboarding@resend.dev'
    const { data, error } = await resend.emails.send({
      from: 'Tally Lead Gen <onboarding@resend.dev>',
      to: 'hemantasaldekar@gmail.com', // 👈 Change to your Gmail address
      subject: `🚨 New Hot Tally Lead: ${company || name}`,
      html: `
        <h2>New Business Consultation Request</h2>
        <p><strong>Contact Name:</strong> ${name}</p>
        <p><strong>Company Name:</strong> ${company || 'Not Specified'}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <hr />
        <h3>Calculated Calculator Diagnostics:</h3>
        <ul>
          <li><strong>Operational Score:</strong> ${score}/100</li>
          <li><strong>Number of Branches:</strong> ${branches}</li>
          <li><strong>Manual Data Hours/Day:</strong> ${manualHours} hours</li>
          <li><strong>Accounts Staff Size:</strong> ${teamSize} employees</li>
        </ul>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}