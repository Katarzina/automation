import { NextResponse } from 'next/server';
import { initDb, saveLead } from '@/lib/db';
import { classifyLead } from '@/lib/gemini';
import { sendTelegramMessage } from '@/lib/telegram';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message, budget } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await initDb();

  const { score, reasoning } = await classifyLead({ name, email, message, budget: budget ?? '' });

  const lead = await saveLead({ name, email, message, budget: budget ?? '', score, reasoning });

  if (score === 'hot') {
    const scoreEmoji = '🔥';
    const tgMessage = `${scoreEmoji} <b>HOT LEAD!</b>\n\n👤 <b>${name}</b>\n✉️ ${email}\n💰 ${budget || 'not specified'}\n\n💬 ${message}\n\n🤖 <i>${reasoning}</i>`;

    await sendTelegramMessage(tgMessage);

    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'onboarding@resend.dev',
      to: process.env.EMAIL_TO ?? '',
      replyTo: email,
      subject: `🔥 Hot Lead: ${name}`,
      html: `<h2>🔥 Hot Lead!</h2><p><strong>${name}</strong> (${email})</p><p><strong>Budget:</strong> ${budget || 'not specified'}</p><p><strong>Message:</strong><br>${message}</p><p><em>AI reasoning: ${reasoning}</em></p>`,
    });
  } else if (score === 'warm') {
    await sendTelegramMessage(`🌡️ <b>Warm Lead</b>\n\n👤 ${name}\n✉️ ${email}\n💬 ${message.slice(0, 100)}...`);
  }

  return NextResponse.json({ ok: true, score });
}
