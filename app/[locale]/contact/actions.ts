'use server';

export type FormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const service = formData.get('service') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  const emailTo = process.env.EMAIL_TO ?? 'hello@automation-studio.com';
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: emailTo,
        subject: `New contact: ${name} — ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  } else {
    console.log('[Contact form]', { name, email, company, service, message });
  }

  return { success: true, message: "Message sent! We'll be in touch within 24 hours." };
}
