import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { users, meetings, tasks, participants, finishedsummaries } from '../lib/placeholder-data-chomptime';

const client = await db.connect();

async function reset() {
  await client.sql`
  DROP TABLE users;
  `
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      xp INT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, xp)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.xp})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedMeetings() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS meetings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      startTime TIMESTAMP NOT NULL,
      endTime TIMESTAMP NOT NULL,
      locationLink VARCHAR(4095) NOT NULL,
      dayReminderSent BOOLEAN NOT NULL,
      hourReminderSent BOOLEAN NOT NULL
    );
  `;

  const insertedMeetings = await Promise.all(
    meetings.map(async (meeting) => {
      return client.sql`
        INSERT INTO meetings (id, title, startTime, endTime, locationLink, dayReminderSent, hourReminderSent)
        VALUES (${meeting.id}, ${meeting.title}, ${meeting.startTime}, ${meeting.endTime}, ${meeting.locationLink}, ${meeting.dayReminderSent}, ${meeting.hourReminderSent})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedMeetings;
}

async function seedTasks() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      duedate TIMESTAMP NOT NULL,
      assignedId UUID NOT NULL,
      assignerId UUID NOT NULL,
      meetingId UUID NOT NULL,
      priority VARCHAR(255) NOT NULL, 
      status VARCHAR(255) NOT NULL,
      dayReminderSent BOOLEAN NOT NULL,
      hourReminderSent BOOLEAN NOT NULL
    );
  `;

  // const insertedTasks = await Promise.all(
  //   tasks.map(async (task) => {
  //     return client.sql`
  //       INSERT INTO tasks (id, title, duedate, assignedId, assignerId, meetingId, priority, status, dayReminderSent, hourReminderSent)
  //       VALUES (${task.id}, ${task.title}, ${task.duedate}, ${task.assignedId}, ${task.assignerId}, ${task.meetingId}, ${task.priority}, ${task.status}, ${task.dayReminderSent}, ${task.hourReminderSent})
  //       ON CONFLICT (id) DO NOTHING;
  //     `;
  //   }),
  // );

  const insertedTasks = await Promise.all(
    tasks.map(async (task) => {
      // Insert task into the database
      await client.sql`
        INSERT INTO tasks (id, title, duedate, assignedId, assignerId, meetingId, priority, status, dayReminderSent, hourReminderSent)
        VALUES (${task.id}, ${task.title}, ${task.duedate}, ${task.assignedId}, ${task.assignerId}, ${task.meetingId}, ${task.priority}, ${task.status}, ${task.dayReminderSent}, ${task.hourReminderSent})
        ON CONFLICT (id) DO NOTHING;
      `;

      // Check if the task is marked as completed
      if (task.status.toLowerCase() === 'completed') {
        // Update xp for the assigned user
        await client.sql`
          UPDATE users
          SET xp = xp + 10
          WHERE id = ${task.assignedId};
        `;

        // Optionally, update xp for the assigner (if needed)
        await client.sql`
          UPDATE users
          SET xp = xp + 5
          WHERE id = ${task.assignerId};
        `;
      }
    }),
  );
  return insertedTasks;
}

async function seedParticipants() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS participants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId UUID NOT NULL,
      meetingId UUID NOT NULL
    );
  `;

  const insertedParticipants = await Promise.all(
    participants.map(async (parti) => {
      return client.sql`
        INSERT INTO participants (id, userId, meetingId)
        VALUES (${parti.id}, ${parti.userId}, ${parti.meetingId})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedParticipants;
}

async function seedFinishedsummaries() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS finishedsummaries (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      meetingId UUID NOT NULL,
      description VARCHAR(4095) NOT NULL
    );
  `;

  const insertedFinishedsummaries = await Promise.all(
    finishedsummaries.map(async (fin) => {
      return client.sql`
        INSERT INTO finishedsummaries (id, meetingId, description)
        VALUES (${fin.id}, ${fin.meetingId}, ${fin.description})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedFinishedsummaries;
}

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    // await reset();
    await seedUsers();
    await seedMeetings();
    await seedParticipants();
    await seedTasks();
    await seedFinishedsummaries();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'New new database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}