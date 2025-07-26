// Email forwarding using Make.com webhook (free)
export async function sendViaWebhook(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Using Make.com webhook to forward to your email
    const webhookUrl = 'https://hook.eu1.make.com/7sw8qgvkj1234567890'; // Will create real webhook
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to_email: 'edlira.taipi@hotmail.com',
        subject: `Portfolio Contact from ${contactData.name}`,
        html_content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
              New Portfolio Contact Message
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #4F46E5;">Contact Details</h3>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #4F46E5;">Message</h3>
              <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Reply directly to this email to respond to ${contactData.name} at ${contactData.email}</p>
            </div>
          </div>
        `,
        reply_to: contactData.email,
        from_name: 'Portfolio Website',
        timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      console.log('Email sent via Make.com webhook');
      return { success: true };
    } else {
      console.log('Webhook failed:', response.status);
      return { success: false, error: 'Webhook service unavailable' };
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Fallback: Send email via Resend API (free tier)
export async function sendViaResend(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_demo_key', // Demo key for testing
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <portfolio@resend.dev>',
        to: ['edlira.taipi@hotmail.com'],
        subject: `Portfolio Contact from ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Portfolio Contact Message</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
            <hr>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
            <hr>
            <p><small>Reply to: ${contactData.email}</small></p>
          </div>
        `,
        reply_to: contactData.email
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Resend API unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}