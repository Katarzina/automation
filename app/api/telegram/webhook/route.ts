import { NextRequest, NextResponse } from 'next/server';
import { classifyLead } from '@/lib/groq';
import { sendTelegramMessage } from '@/lib/telegram';
import { initDb, saveLead } from '@/lib/db';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

const sessions = new Map<number, {
  step: number;
  name?: string;
  email?: string;
  message?: string;
  budget?: string;
}>();

async function sendMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body?.message;
  if (!message) return NextResponse.json({ ok: true });

  const chatId: number = message.chat.id;
  const text: string = message.text ?? '';

  if (text === '/start') {
    sessions.set(chatId, { step: 0 });
    await sendMessage(chatId, `👋 Hi! I'm the AI assistant at AI Automation Studio.\n\nWe help businesses automate processes using AI.\n\nWhat's your name?`);
    return NextResponse.json({ ok: true });
  }

  const session = sessions.get(chatId) ?? { step: 0 };

  if (session.step === 0) {
    sessions.set(chatId, { ...session, step: 1, name: text });
    await sendMessage(chatId, `Nice to meet you, ${text}! 👋\n\nWhat's your business and what would you like to automate?`);

  } else if (session.step === 1) {
    sessions.set(chatId, { ...session, step: 2, message: text });
    await sendMessage(chatId, `Got it. What's your approximate budget for the project? (you can write "not sure")`);

  } else if (session.step === 2) {
    sessions.set(chatId, { ...session, step: 3, budget: text });
    await sendMessage(chatId, `Great! What email should we send the details to?`);

  } else if (session.step === 3) {
    const email = text;
    const s = { ...session, email };
    sessions.delete(chatId);

    await sendMessage(chatId, `Thank you! We'll get back to you within 24 hours. 🙌`);

    const { score, reasoning } = await classifyLead({
      name: s.name ?? 'Unknown',
      email,
      message: s.message ?? '',
      budget: s.budget ?? '',
    });

    await initDb();
    await saveLead({
      name: s.name ?? 'Unknown',
      email,
      message: s.message ?? '',
      budget: s.budget ?? '',
      company: '',
      service: 'Telegram Bot',
      score,
      reasoning,
    });

    const scoreEmoji = score === 'hot' ? '🔥' : score === 'warm' ? '🌡️' : '❄️';
    await sendTelegramMessage(
      `${scoreEmoji} <b>New lead from Telegram Bot</b>\n\n` +
      `👤 <b>${s.name}</b>\n` +
      `✉️ ${email}\n` +
      `💰 ${s.budget || 'not specified'}\n\n` +
      `💬 ${s.message}\n\n` +
      `🤖 <i>${reasoning}</i>`
    );
  }

  return NextResponse.json({ ok: true });
}
