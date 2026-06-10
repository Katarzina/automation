import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { initDb, saveLead } from '@/lib/db';
import { sendTelegramMessage } from '@/lib/telegram';
import { Resend } from 'resend';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant for AI Automation Studio — a company that builds AI automation workflows, AI agents, custom software, and high-converting landing pages for businesses in Europe and globally.

Your mission: understand the visitor's needs, qualify them as a potential client, then naturally capture their name and email to send a tailored proposal.

OUR SERVICES:
- AI Automation: n8n workflows, document processing, CRM automation, invoice automation
- AI Agents: customer support bots, sales agents, research agents (24/7 automated)
- Custom Software: dashboards, SaaS MVPs, internal tools
- Landing Pages: high-converting pages, speed-first development

PROVEN RESULTS: 45h/month saved on manual work, 70% queries automated, 80% faster invoice processing, 8.4% landing page conversion rates.

CONVERSATION RULES:
- Keep responses SHORT: 2-3 sentences maximum
- Ask only ONE question per message
- Be warm and professional, not salesy
- Detect the user's language from their first message and respond in the SAME language throughout
- Show genuine interest and mention a relevant result/case when appropriate

FLOW:
1. Warm greeting, ask what they'd like to automate or what challenge they have
2. Ask 1-2 clarifying questions (what process, rough budget range, timeline)
3. Express enthusiasm, briefly mention a relevant result we've achieved
4. Naturally ask: "What's your name and email so I can send you a detailed proposal?"

IMPORTANT: When you have collected BOTH the user's name AND email in the conversation, end your final message with this exact format on a new line (nothing after it):
LEAD_CAPTURED:{"name":"Full Name","email":"email@example.com","summary":"one sentence about their project"}

Never invent prices. Be honest if something is outside our expertise.`;

type Message = { role: 'user' | 'model'; content: string };

export async function POST(request: Request) {
  const { messages } = await request.json() as { messages: Message[] };

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ systemInstruction: SYSTEM_PROMPT, history });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    const leadMatch = responseText.match(/LEAD_CAPTURED:(\{[^}]+\})/);
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1]);
        const cleanMessage = responseText.replace(/LEAD_CAPTURED:\{[^}]+\}/, '').trim();

        await initDb();
        await saveLead({
          name: leadData.name,
          email: leadData.email,
          message: leadData.summary ?? 'Via AI chat',
          company: '',
          service: 'chat',
          budget: '',
          score: 'hot',
          reasoning: 'Captured via AI chat conversation',
        });

        await sendTelegramMessage(
          `🤖 <b>AI Chat Lead!</b>\n\n👤 <b>${leadData.name}</b>\n✉️ ${leadData.email}\n\n💬 ${leadData.summary}`
        );

        await resend.emails.send({
          from: process.env.EMAIL_FROM ?? 'onboarding@resend.dev',
          to: process.env.EMAIL_TO ?? '',
          replyTo: leadData.email,
          subject: `🤖 AI Chat Lead: ${leadData.name}`,
          html: `<h2>🤖 New lead from AI Chat</h2><p><strong>${leadData.name}</strong> (${leadData.email})</p><p>${leadData.summary}</p>`,
        });

        return NextResponse.json({ message: cleanMessage, lead_captured: true });
      } catch {
        // JSON parse failed, continue normally
      }
    }

    return NextResponse.json({ message: responseText, lead_captured: false });
  } catch (err) {
    console.error('[chat] error:', err);
    return NextResponse.json({
      message: "I'm having a technical issue right now. Please use the contact form on the page — we'll get back to you within 24 hours.",
      lead_captured: false,
    });
  }
}
