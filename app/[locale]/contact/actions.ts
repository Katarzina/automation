'use server';

import { Resend } from 'resend';
import { SITE } from '@/lib/config';

export type FormState = {
  success: boolean;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'onboarding@resend.dev',
    to: process.env.EMAIL_TO ?? SITE.email,
    replyTo: email,
    subject: `New contact: ${name} — ${service || 'General'}`,
    html: `
      <h2>New message from ${SITE.name}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ''}
        ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ''}
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }

  return { success: true, message: "Message sent! We'll be in touch within 24 hours." };
}
