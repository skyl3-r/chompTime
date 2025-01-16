import { db } from '@vercel/postgres';

const client = await db.connect();

export async function GET() {
  try {
    const events = await client.sql`
      SELECT * FROM meetings ORDER BY startTime ASC;
    `;
    return new Response(JSON.stringify(events.rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, startTime, endTime, locationLink } = await req.json();
    const result = await client.sql`
      INSERT INTO meetings (title, startTime, endTime, locationLink)
      VALUES (${title}, ${startTime}, ${endTime}, ${locationLink})
      RETURNING *;
    `;
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}

export async function onRequest(req: Request) {
  const { method } = req;

  if (method !== 'GET' && method !== 'POST') {
    return new Response(`Method ${method} not allowed`, {
      status: 405,
      headers: { Allow: 'GET, POST' },
    });
  }

  // Call the appropriate method handler
  if (method === 'GET') return GET();
  if (method === 'POST') return POST(req);
}