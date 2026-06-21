import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      budget TEXT,
      score TEXT NOT NULL DEFAULT 'cold',
      reasoning TEXT,
      notified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS company TEXT DEFAULT ''`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS service TEXT DEFAULT ''`;
  await sql`
    CREATE TABLE IF NOT EXISTS bot_sessions (
      chat_id BIGINT PRIMARY KEY,
      step INTEGER NOT NULL DEFAULT 0,
      name TEXT,
      email TEXT,
      message TEXT,
      budget TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export type BotSession = {
  step: number;
  name?: string;
  email?: string;
  message?: string;
  budget?: string;
};

export async function getSession(chatId: number): Promise<BotSession | null> {
  const rows = await sql<BotSession[]>`SELECT step, name, email, message, budget FROM bot_sessions WHERE chat_id = ${chatId}`;
  return rows[0] ?? null;
}

export async function setSession(chatId: number, data: BotSession) {
  await sql`
    INSERT INTO bot_sessions (chat_id, step, name, email, message, budget, updated_at)
    VALUES (${chatId}, ${data.step}, ${data.name ?? null}, ${data.email ?? null}, ${data.message ?? null}, ${data.budget ?? null}, NOW())
    ON CONFLICT (chat_id) DO UPDATE SET
      step = EXCLUDED.step,
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      message = EXCLUDED.message,
      budget = EXCLUDED.budget,
      updated_at = NOW()
  `;
}

export async function deleteSession(chatId: number) {
  await sql`DELETE FROM bot_sessions WHERE chat_id = ${chatId}`;
}

export async function saveLead(data: {
  name: string;
  email: string;
  message: string;
  budget: string;
  company: string;
  service: string;
  score: string;
  reasoning: string;
}) {
  const [lead] = await sql`
    INSERT INTO leads (name, email, message, budget, company, service, score, reasoning)
    VALUES (${data.name}, ${data.email}, ${data.message}, ${data.budget}, ${data.company}, ${data.service}, ${data.score}, ${data.reasoning})
    RETURNING *
  `;
  return lead;
}

export async function getAllLeads() {
  return sql`SELECT * FROM leads ORDER BY created_at DESC`;
}

export default sql;
