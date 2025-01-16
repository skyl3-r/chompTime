import { sql } from "@vercel/postgres";
import { sendEmail } from "@/app/lib/emailService";

export async function GET() {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    try {
        // fetch tasks due in one day
        // const taskDayReminders = await sql`
        // SELECT * FROM tasks
        // WHERE (duedate <= ${oneDayLater})
        // `;

        // fetch tasks due in one hour

    } catch (error) {
        
    }
}