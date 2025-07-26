// Simple email solution using EmailJS API
export async function sendSimpleEmail(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Use a simple email forwarding service
    const emailBody = `
New Portfolio Contact Message

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}

Message:
${contactData.message}

---
Sent from Portfolio Website
Reply directly to: ${contactData.email}
    `;

    // Using EmailJS public API (no signup required)
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_portfolio',
        template_id: 'template_contact',
        user_id: 'portfolio_user',
        template_params: {
          to_email: 'edlira.taipi@hotmail.com',
          from_name: contactData.name,
          from_email: contactData.email,
          subject: `Portfolio Contact from ${contactData.name}`,
          message: emailBody,
          reply_to: contactData.email
        }
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'EmailJS service unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Alternative: Direct HTTP notification to your email via webhook
export async function sendDirectNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Send to ntfy.sh - free notification service
    const notificationText = `📧 New Portfolio Contact!

From: ${contactData.name} (${contactData.email})
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message: ${contactData.message}

Reply to: ${contactData.email}`;

    const response = await fetch('https://ntfy.sh/edlira-portfolio-contacts', {
      method: 'POST',
      headers: {
        'Title': `New Contact: ${contactData.name}`,
        'Priority': '4',
        'Tags': 'email,portfolio,contact'
      },
      body: notificationText
    });

    if (response.ok) {
      console.log('Notification sent to ntfy.sh topic');
      return { success: true };
    } else {
      return { success: false, error: 'Notification service unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}