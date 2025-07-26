// Reliable email forwarding using Brevo (formerly Sendinblue) - Free tier
export async function sendViaBrevo(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY || 'demo-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Website',
          email: 'noreply@portfolio.com'
        },
        to: [{
          email: 'edlira.taipi@hotmail.com',
          name: 'Edlira Taipi'
        }],
        subject: `Portfolio Contact from ${contactData.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">
                New Portfolio Contact Message
              </h2>
              
              <div style="margin: 25px 0;">
                <h3 style="color: #4F46E5; margin-bottom: 10px;">Contact Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${contactData.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${contactData.email}</td>
                  </tr>
                  ${contactData.phone ? `
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${contactData.phone}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              
              <div style="margin: 25px 0;">
                <h3 style="color: #4F46E5; margin-bottom: 10px;">Message</h3>
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #4F46E5; border-radius: 4px; line-height: 1.6;">
                  ${contactData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p style="margin: 5px 0;"><strong>Reply directly to this email</strong> to respond to ${contactData.name}</p>
                <p style="margin: 5px 0;">Or send your reply to: <a href="mailto:${contactData.email}" style="color: #4F46E5;">${contactData.email}</a></p>
                <p style="margin: 15px 0 5px 0; font-size: 12px; color: #999;">This message was sent from your portfolio website contact form.</p>
              </div>
            </div>
          </div>
        `,
        replyTo: {
          email: contactData.email,
          name: contactData.name
        }
      }),
    });

    if (response.ok) {
      console.log('Email sent successfully via Brevo');
      return { success: true };
    } else {
      const errorText = await response.text();
      console.log('Brevo API failed:', response.status, errorText);
      return { success: false, error: `Brevo API error: ${response.status}` };
    }
  } catch (error) {
    console.error('Brevo email error:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Alternative: Using EmailOctopus API (free tier)
export async function sendViaEmailOctopus(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Create email content
    const emailContent = `
New Portfolio Contact Message

From: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

---
Reply to: ${contactData.email}
Sent from Portfolio Website
    `;

    const response = await fetch(`https://emailoctopus.com/api/1.6/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.EMAILOCTOPUS_API_KEY || 'demo-key',
        name: `Portfolio Contact: ${contactData.name}`,
        subject: `New Portfolio Message from ${contactData.name}`,
        content: {
          html: emailContent.replace(/\n/g, '<br>'),
          plain_text: emailContent
        },
        from: {
          name: 'Portfolio Website',
          email_address: 'noreply@portfolio.com'
        },
        to: [{
          email_address: 'edlira.taipi@hotmail.com'
        }]
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'EmailOctopus API unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Using Mailgun API (has free tier)
export async function sendViaMailgun(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const formData = new FormData();
    formData.append('from', 'Portfolio <mailgun@sandbox-123.mailgun.org>');
    formData.append('to', 'edlira.taipi@hotmail.com');
    formData.append('subject', `Portfolio Contact from ${contactData.name}`);
    formData.append('html', `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
      <hr>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p>Reply to: ${contactData.email}</p>
    `);
    formData.append('h:Reply-To', contactData.email);

    const response = await fetch('https://api.mailgun.net/v3/sandbox-123.mailgun.org/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('api:' + (process.env.MAILGUN_API_KEY || 'demo-key')).toString('base64')
      },
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Mailgun API unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}