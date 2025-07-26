// Simple fallback email service using Formspree or EmailJS
export async function sendViaFormspree(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    // Using Formspree free service - creates endpoint automatically
    const response = await fetch('https://formspree.io/f/xpwajqko', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || '',
        message: contactData.message,
        _replyto: contactData.email,
        _subject: `Portfolio Contact: ${contactData.name}`,
        _to: 'edlira.taipi@hotmail.com'
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Formspree service unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Alternative: Web3Forms (completely free, no signup)
export async function sendViaWeb3Forms(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: 'YOUR_ACCESS_KEY', // Get free key from web3forms.com
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || '',
        message: contactData.message,
        to: 'edlira.taipi@hotmail.com',
        subject: `Portfolio Contact from ${contactData.name}`,
        from_name: 'Portfolio Website',
        return_to: contactData.email
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Web3Forms service unavailable' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}