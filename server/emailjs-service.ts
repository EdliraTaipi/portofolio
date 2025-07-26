// EmailJS service - reliable client-side email delivery
export async function sendViaEmailJS(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // EmailJS public service (works without backend setup)
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'template_contact',
        user_id: 'user_portfolio',
        template_params: {
          to_email: 'edlira.taipi@hotmail.com',
          from_name: contactData.name,
          from_email: contactData.email,
          phone: contactData.phone || 'Not provided',
          message: contactData.message,
          subject: `Portfolio Contact from ${contactData.name}`,
          reply_to: contactData.email
        }
      }),
    });

    if (response.ok) {
      console.log('EmailJS sent successfully');
      return { success: true };
    } else {
      return { success: false, error: 'EmailJS service unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Direct SMTP using Nodemailer with Brevo (most reliable)
import nodemailer from 'nodemailer';

export async function sendDirectSMTP(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Create Brevo SMTP transporter with your credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '9320ea001@smtp-brevo.com',
        pass: 'vXfBO3hRZJpwgU0a'
      },
    });

    const mailOptions = {
      from: '9320ea001@smtp-brevo.com',
      to: 'edlira.taipi@hotmail.com',
      replyTo: contactData.email,
      subject: `Portfolio Contact from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Portfolio Contact
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4F46E5;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            ${contactData.phone ? `<p><strong>Phone:</strong> <a href="tel:${contactData.phone}">${contactData.phone}</a></p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4F46E5;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Reply directly to this email to respond to ${contactData.name}</p>
            <p>Sent from your portfolio contact form</p>
          </div>
        </div>
      `,
      text: `
Portfolio Contact from ${contactData.name}

Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

Reply to: ${contactData.email}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Direct SMTP email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('SMTP error:', error);
    return { success: false, error: (error as Error).message };
  }
}