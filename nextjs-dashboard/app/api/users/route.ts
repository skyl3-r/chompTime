import { db } from '@vercel/postgres';

const client = await db.connect();

export async function GET() {
  try {
    const result = await client.sql`
      SELECT id, name, email, xp FROM users ORDER BY xp DESC;
    `;

    return new Response(JSON.stringify({ success: true, users: result.rows }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // Narrow the type of `error` to check if it has a `message` property
    if (error instanceof Error) {
      console.error('Error fetching users:', error.message);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    // Handle unexpected error types
    console.error('Unexpected error fetching users:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: 500 }
    );
  }
}