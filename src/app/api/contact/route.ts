import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields (Name, Email, Message) are required.' },
                { status: 400 }
            );
        }

        const recipientEmail = process.env.NEXT_PUBLIC_EMAIL || 'anshuaman83@gmail.com';
        const smtpUser = process.env.SMTP_USER || recipientEmail;
        const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = parseInt(process.env.SMTP_PORT || '465');

        // 1. If SMTP password (e.g. Gmail App Password) is provided, send email directly via Nodemailer
        if (smtpPass) {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });

            await transporter.sendMail({
                from: `"Portfolio Transmission" <${smtpUser}>`,
                to: recipientEmail,
                replyTo: email,
                subject: `🚀 [Portfolio Contact] New message from ${name}`,
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050807; color: #e5e7eb; padding: 32px; border-radius: 12px; border: 1px solid rgba(57,255,20,0.3); max-width: 600px; margin: 0 auto;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
                            <span style="display: inline-block; width: 12px; height: 12px; background-color: #39FF14; border-radius: 50%; box-shadow: 0 0 10px #39FF14;"></span>
                            <h2 style="color: #39FF14; margin: 0; font-size: 20px; font-family: monospace; letter-spacing: 2px;">INCOMING TRANSMISSION</h2>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #143B25; margin: 16px 0;" />
                        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #39FF14;">FROM:</strong> ${name} (&lt;<a href="mailto:${email}" style="color: #39FF14; text-decoration: none;">${email}</a>&gt;)</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #39FF14;">DELIVER TO:</strong> ${recipientEmail}</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #39FF14;">TIMESTAMP:</strong> ${new Date().toLocaleString()}</p>
                        <hr style="border: 0; border-top: 1px solid #143B25; margin: 20px 0;" />
                        <h3 style="color: #ffffff; margin-bottom: 10px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">Transmission Content:</h3>
                        <div style="background-color: #09150E; padding: 20px; border-radius: 8px; border-left: 3px solid #39FF14; color: #ffffff; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">
${message}
                        </div>
                        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #6b7280; font-size: 12px;">
                            Sent from your portfolio contact protocol • Reply directly to this email to contact ${name}
                        </div>
                    </div>
                `,
            });

            return NextResponse.json({
                success: true,
                delivery: 'smtp',
                message: 'Transmission successfully routed to your inbox!',
            });
        }

        // 2. Fallback when SMTP_PASS is not yet configured:
        // Prepare mailto protocol URL so the sender can seamlessly dispatch
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
            `Portfolio Transmission from ${name}`
        )}&body=${encodeURIComponent(
            `Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        return NextResponse.json({
            success: true,
            delivery: 'fallback',
            mailtoUrl,
            message: 'Transmission data generated!',
            note: 'To enable automatic server-side email dispatch directly to your inbox, add SMTP_PASS in .env',
        });
    } catch (error) {
        console.error('Contact transmission error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Transmission failure occurred.',
            },
            { status: 500 }
        );
    }
}
