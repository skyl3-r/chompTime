// import { sql } from "@vercel/postgres";
// import { sendEmail } from "@/app/lib/emailService";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//     runtime: 'edge',
// }

// export default async function handler(req: NextRequest) {
//     // const cron = req.nextUrl.pathname.split('/')[3]
//     // if (!cron) return new Response('No cron provided', { status: 400 });
//     try {
//         // fetch tasks due in one hour
//         const taskHourReminders = await sql`
//         SELECT tasks.*, users.name AS username, users.email AS useremail
//         FROM tasks JOIN users ON tasks.assignedId = users.id 
//         WHERE (tasks.duedate <= NOW() + INTERVAL '1 hour' AND tasks.status = 'pending' AND tasks.hourremindersent = false);
//         `;

//         for (const h of taskHourReminders.rows) {
//             await sendEmail({
//                 to: h.useremail,
//                 subject: "Task Reminder: Deadline Approaching...",
//                 body: `Hey ${h.username}, you've got a task "${h.title}" with a hungry deadline approaching in just 1 hour (${h.duedate}). It's time to dive in and get chomping!`
//             });
//             await sql`
//             UPDATE tasks
//             SET hourremindersent = true
//             WHERE id = ${h.id}
//             `;
//         }

//         // if alr sent for due in one hour, dont send due in one day ?
//         // fetch tasks due in one day
//         const taskDayReminders = await sql`
//         SELECT tasks.*, users.name AS username, users.email AS useremail
//         FROM tasks JOIN users ON tasks.assignedId = users.id 
//         WHERE (tasks.duedate <= NOW() + INTERVAL '1 day' AND tasks.status = 'pending' AND tasks.dayremindersent = false AND tasks.hourremindersent = false);
//         `;

//         for (const d of taskDayReminders.rows) {
//             await sendEmail({
//                 to: d.useremail,
//                 subject: "Task Reminder: Champ smells a task... due tomorrow!",
//                 body: `Hey ${d.username}, your next big chomp "${d.title}" is due in 24 hours (${d.duedate}), and Champ knows you've got the bite to finish it on time. Don't wait till it's circling too close!`
//             });
//             await sql`
//             UPDATE tasks 
//             SET dayremindersent = true 
//             WHERE id = ${d.id}
//             `;
//         }

//         // fetch meetings in one hour

//         // fetch meetings in one day

//         return new NextResponse("Reminders processed successfully", {status: 200});
//     } catch (error) {
//         console.error("Error processing reminders", error);
//         return new NextResponse("Failed to process reminders", {status: 500})
//     }
// }