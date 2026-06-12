import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, branches, manualHours, teamSize, score } = body;

    // Direct structural validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing core representative credential records.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hemantasaldekar@gmail.com', // 👈 Double check this is your verified Gmail address
      subject: `🚨 New Lead: Shell Software Solutions Simulator (${score}/100)`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0f172a;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            Target Lead Profile Captured
          </h2>
          <p><strong>Representative Name:</strong> ${name}</p>
          <p><strong>Company Legal Name:</strong> ${company || 'Not Disclosed'}</p>
          <p><strong>WhatsApp/Direct Phone:</strong> ${phone}</p>
          <p><strong>Official Email Address:</strong> ${email}</p>
          
          <h3 style="color: #0f172a; margin-top: 20px;">Diagnostic Metrics:</h3>
          <ul style="background: #f8fafc; padding: 15px; list-style: none; border-radius: 8px;">
            <li>🏢 <strong>Deployment Branches:</strong> ${branches}</li>
            <li>⏱️ <strong>Manual voucher Entry Hours/Day:</strong> ${manualHours} Hours</li>
            <li>👥 <strong>Active Endpoint Personnel:</strong> ${teamSize} Staff Nodes</li>
            <li>📊 <strong style="color: #2563eb;">Workflow Integrity Score:</strong> <strong>${score}/100</strong></li>
          </ul>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    // Fixed: Standard Unknown typed error tracking to appease the Vercel strict linter
    const errorMessage = err instanceof Error ? err.message : 'Unknown technical transmission fault';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}