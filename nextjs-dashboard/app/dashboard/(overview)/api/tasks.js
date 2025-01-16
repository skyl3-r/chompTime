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

export default async function handler(req, res) {
  await createTasksTable(); // Ensure the table exists

  if (req.method === 'POST') {
    const { description, assignedTo } = req.body;

    try {
      const result = await client.sql`
        INSERT INTO tasks (description, assigned_to, completed)
        VALUES (${description}, ${assignedTo}, false)
        RETURNING *;
      `;

      const task = result.rows[0];
      res.status(201).json({ success: true, task });
    } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}