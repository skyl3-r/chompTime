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
      startTime DATE NOT NULL,
      endTime DATE NOT NULL,
      locationLink VARCHAR(511) NOT NULL
    );
  `;

  const insertedMeetings = await Promise.all(
    meetings.map(async (meeting) => {
      return client.sql`
        INSERT INTO meetings (id, title, startTime, endTime, locationLink)
        VALUES (${meeting.id}, ${meeting.title}, ${meeting.startTime}, ${meeting.endTime}, ${meeting.locationLink})
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
      dueDate DATE NOT NULL,
      assignedId UUID NOT NULL,
      meetingId UUID NOT NULL,
      priority VARCHAR(255) NOT NULL, 
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedTasks = await Promise.all(
    tasks.map(async (task) => {
      return client.sql`
        INSERT INTO tasks (id, title, duedate, assignedId, meetingId, priority, status)
        VALUES (${task.id}, ${task.title}, ${task.duedate}, ${task.assignedId}, ${task.meetingId}, ${task.priority}, ${task.status})
        ON CONFLICT (id) DO NOTHING;
      `;
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
      meetingId UUID NOT NULL,
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
      description VARCHAR(511) NOT NULL,
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

    return Response.json({ message: 'New database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
