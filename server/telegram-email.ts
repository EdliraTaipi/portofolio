// Telegram notification service - instant delivery to your phone
export async function sendViaTelegram(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Using Telegram Bot API for instant notifications
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '6789012345:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw'; // Demo token
    const chatId = process.env.TELEGRAM_CHAT_ID || '@edlira_portfolio_notifications'; // Demo channel
    
    const messageText = `
🔔 *New Portfolio Contact*

👤 *Name:* ${contactData.name}
📧 *Email:* ${contactData.email}
${contactData.phone ? `📱 *Phone:* ${contactData.phone}` : ''}

💬 *Message:*
${contactData.message}

---
💡 Reply to: ${contactData.email}
⏰ Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      }),
    });

    if (response.ok) {
      console.log('Telegram notification sent successfully');
      return { success: true };
    } else {
      return { success: false, error: 'Telegram delivery failed' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Email forwarding using FormSubmit (no signup required)
export async function sendViaFormSubmit(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Use form-data format instead of JSON (FormSubmit prefers this)
    const formData = new URLSearchParams();
    formData.append('name', contactData.name);
    formData.append('email', contactData.email);
    formData.append('phone', contactData.phone || 'Not provided');
    formData.append('message', contactData.message);
    formData.append('_subject', `Portfolio Contact from ${contactData.name}`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('_autoresponse', 'Thank you for your message. Edlira will respond soon.');
    
    const response = await fetch('https://formsubmit.co/edlira.taipi@hotmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      console.log('FormSubmit email sent successfully');
      return { success: true };
    } else {
      return { success: false, error: 'FormSubmit delivery failed' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}