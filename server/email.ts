import nodemailer from 'nodemailer';

// Free email service using Gmail SMTP (no API key required)
export async function sendContactEmail(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Create transporter using Gmail SMTP (works with any email for sending)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER || 'portfolio.notifications.et@gmail.com', // Dedicated Gmail for sending
        pass: process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD, // App password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER || 'portfolio.notifications.et@gmail.com',
      to: 'edlira.taipi@hotmail.com', // Your email address
      subject: `New Contact Form Message from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Portfolio Contact Message
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-bottom: 5px;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-bottom: 5px;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio website contact form.</p>
            <p>You can reply directly to this email to respond to ${contactData.name}.</p>
          </div>
        </div>
      `,
      replyTo: contactData.email, // Allow direct reply to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Alternative: Simple webhook option (no email service needed)
export async function sendToWebhook(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // You can use services like:
    // - Zapier webhooks (free)
    // - Make.com webhooks (free)
    // - IFTTT webhooks (free)
    
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return { success: false, error: 'No webhook URL configured' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `New portfolio message from ${contactData.name} (${contactData.email}): ${contactData.message}`,
        contact: contactData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Webhook failed' };
    }
  } catch (error) {
    console.error('Webhook sending failed:', error);
    return { success: false, error: (error as Error).message };
  }
}