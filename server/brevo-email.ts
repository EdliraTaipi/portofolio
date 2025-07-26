// Brevo email service for reliable email delivery
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      },
      body: JSON.stringify({
        sender: {
          name: 'Edlira Taipi',
          email: '9320ea001@smtp-brevo.com'
        },
        to: [
          {
            email: 'edlira.taipi@hotmail.com',
            name: 'Edlira Taipi'
          }
        ],
        replyTo: {
          email: contactData.email,
          name: contactData.name
        },
        subject: `New Portfolio Contact from ${contactData.name}`,
        htmlContent: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Portfolio Contact</h1>
              <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Someone reached out through your portfolio</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 30px; border-left: 4px solid #667eea;">
              <h2 style="color: #333; margin-top: 0; font-size: 20px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #555; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${contactData.email}" style="color: #667eea; text-decoration: none;">${contactData.email}</a>
                  </td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="tel:${contactData.phone}" style="color: #667eea; text-decoration: none;">${contactData.phone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef;">
              <h2 style="color: #333; margin-top: 0; font-size: 20px;">Message</h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; line-height: 1.6; color: #333;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Quick Actions:</strong> 
                <a href="mailto:${contactData.email}?subject=Re: Portfolio Contact" style="color: #667eea; text-decoration: none; margin: 0 10px;">Reply via Email</a> |
                <a href="tel:${contactData.phone || ''}" style="color: #667eea; text-decoration: none; margin: 0 10px;">Call ${contactData.phone ? contactData.phone : 'N/A'}</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 12px;">
                Sent from your portfolio contact form • Reply directly to respond to ${contactData.name}
              </p>
            </div>
          </div>
        `,
        textContent: `
New Portfolio Contact Message

From: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

---
Reply directly to this email to respond to ${contactData.name}
        `
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Email sent via Brevo:', result.messageId);
      return { success: true, messageId: result.messageId };
    } else {
      const error = await response.text();
      console.error('Brevo API error:', response.status, error);
      return { success: false, error: `Brevo API error: ${response.status}` };
    }
  } catch (error) {
    console.error('Brevo email failed:', error);
    return { success: false, error: (error as Error).message };
  }
}