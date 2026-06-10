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
}

export async function saveLead(data: {
  name: string;
  email: string;
  message: string;
  budget: string;
  score: string;
  reasoning: string;
}) {
  const [lead] = await sql`
    INSERT INTO leads (name, email, message, budget, score, reasoning)
    VALUES (${data.name}, ${data.email}, ${data.message}, ${data.budget}, ${data.score}, ${data.reasoning})
    RETURNING *
  `;
  return lead;
}

export async function getAllLeads() {
  return sql`SELECT * FROM leads ORDER BY created_at DESC`;
}

export default sql;
