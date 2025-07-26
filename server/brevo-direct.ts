import nodemailer from 'nodemailer';

// Direct Brevo SMTP using your exact credentials
export async function sendViaBrevoSMTP(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Create transporter with your exact Brevo SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // false for 587, true for 465
      auth: {
        user: '9320ea001@smtp-brevo.com',
        pass: 'vXfBO3hRZJpwgU0a'
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('Brevo SMTP connection verified successfully');

    const mailOptions = {
      from: {
        name: 'Edlira Taipi',
        address: 'edlira.taipi@hotmail.com'
      },
      to: 'edlira.taipi@hotmail.com',
      replyTo: {
        name: contactData.name,
        address: contactData.email
      },
      subject: `Portfolio Contact from ${contactData.name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Portfolio Contact</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Message received from your website</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8fafc; border-radius: 0 0 12px 12px;">
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-bottom: 25px;">
              <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${contactData.email}" style="color: #4F46E5; text-decoration: none; font-weight: 500;">${contactData.email}</a></td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${contactData.phone}" style="color: #4F46E5; text-decoration: none; font-weight: 500;">${contactData.phone}</a></td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">Message</h2>
              <div style="background: #f1f5f9; padding: 25px; border-radius: 8px; border-left: 5px solid #4F46E5; line-height: 1.7; color: #334155; font-size: 16px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%); border-radius: 10px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #4338ca; font-size: 16px; font-weight: 600;">Ready to Reply?</p>
              <p style="margin: 0; color: #6366f1; font-size: 14px;">Click reply or respond directly to <strong>${contactData.email}</strong></p>
            </div>
            
            <div style="margin-top: 25px; padding: 20px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0;">Sent from your portfolio contact form</p>
              <p style="margin: 5px 0 0 0;">Delivered via Brevo SMTP • ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact

Contact Information:
Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

---
Reply directly to this email to respond to ${contactData.name}
Sent: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
Delivered via Brevo SMTP
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Brevo SMTP email sent successfully:', result.messageId);
    return { 
      success: true, 
      messageId: result.messageId,
      service: 'Brevo SMTP'
    };

  } catch (error) {
    console.error('Brevo SMTP error:', error);
    return { 
      success: false, 
      error: `Brevo SMTP failed: ${(error as Error).message}`,
      service: 'Brevo SMTP'
    };
  }
}