import { NextResponse } from 'next/server';
import { initDb, saveLead } from '@/lib/db';
import { classifyLead } from '@/lib/gemini';
import { sendTelegramMessage } from '@/lib/telegram';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message, budget, company, service } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await initDb();

  const { score, reasoning } = await classifyLead({ name, email, message, budget: budget ?? '' });

  const lead = await saveLead({
    name,
    email,
    message,
    budget: budget ?? '',
    company: company ?? '',
    service: service ?? '',
    score,
    reasoning,
  });

  const scoreEmoji = score === 'hot' ? '🔥' : score === 'warm' ? '🌡️' : '❄️';
  const scoreLabel = score === 'hot' ? 'HOT LEAD' : score === 'warm' ? 'Warm Lead' : 'New Lead';
  const emailSubject = score === 'hot' ? `🔥 Hot Lead: ${name}` : score === 'warm' ? `🌡️ Warm Lead: ${name}` : `❄️ New Lead: ${name}`;

  const tgMessage = `${scoreEmoji} <b>${scoreLabel}</b>\n\n👤 <b>${name}</b>\n✉️ ${email}${company ? `\n🏢 ${company}` : ''}${service ? `\n🔧 ${service}` : ''}\n💰 ${budget || 'not specified'}\n\n💬 ${message}\n\n🤖 <i>${reasoning}</i>`;

  await sendTelegramMessage(tgMessage);

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'onboarding@resend.dev',
    to: process.env.EMAIL_TO ?? '',
    replyTo: email,
    subject: emailSubject,
    html: `<h2>${scoreEmoji} ${scoreLabel}</h2>
<table cellpadding="8" style="border-collapse:collapse">
  <tr><td><strong>Name</strong></td><td>${name}</td></tr>
  <tr><td><strong>Email</strong></td><td>${email}</td></tr>
  ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ''}
  ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ''}
  <tr><td><strong>Budget</strong></td><td>${budget || 'not specified'}</td></tr>
  <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
</table>
<p><em>AI reasoning: ${reasoning}</em></p>`,
  });

  return NextResponse.json({ ok: true, score });
}
