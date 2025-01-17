import { db } from '@vercel/postgres';

const client = await db.connect();

async function createTasksTable() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      description TEXT NOT NULL,
      assigned_to TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
}

export async function POST(req) {
  await createTasksTable(); // Ensure the table exists

  const { description, assignedTo } = await req.json();

  try {
    const result = await client.sql`
      INSERT INTO tasks (description, assigned_to, completed)
      VALUES (${description}, ${assignedTo}, false)
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, task: result.rows[0] }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error inserting task:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}