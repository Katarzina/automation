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
