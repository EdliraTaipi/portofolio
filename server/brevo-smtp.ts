// Brevo API email service (more reliable than SMTP for Brevo)
export async function sendViaBrevoAPI(contactData: {
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
          name: 'Edlira Taipi Portfolio',
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
        subject: `Portfolio Contact from ${contactData.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${contactData.name}</p>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #667eea; text-decoration: none;">${contactData.email}</a></p>
                ${contactData.phone ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${contactData.phone}" style="color: #667eea; text-decoration: none;">${contactData.phone}</a></p>` : ''}
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; border-radius: 4px; font-size: 16px; line-height: 1.6;">
                  ${contactData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Reply directly to this email</strong> to respond to ${contactData.name}
                </p>
                <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">
                  Sent from your portfolio contact form at ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
                </p>
              </div>
            </div>
          </div>
        `,
        textContent: `
New Portfolio Contact

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

---
Reply to: ${contactData.email}
Sent: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
        `
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Brevo API email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } else {
      const error = await response.text();
      console.error('Brevo API failed:', response.status, error);
      return { success: false, error: `Brevo API error: ${response.status}` };
    }
  } catch (error) {
    console.error('Brevo API error:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Direct FormSubmit activation trigger
export async function triggerFormSubmitActivation() {
  try {
    const formData = new URLSearchParams();
    formData.append('name', 'FormSubmit Activation');
    formData.append('email', 'activation@example.com');
    formData.append('message', 'This is an activation trigger for FormSubmit service');
    formData.append('_subject', 'FormSubmit Activation Request');
    formData.append('_captcha', 'false');
    
    const response = await fetch('https://formsubmit.co/edlira.taipi@hotmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    console.log('FormSubmit activation trigger sent');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}