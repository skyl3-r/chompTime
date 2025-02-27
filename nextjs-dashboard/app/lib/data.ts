import { sql } from '@vercel/postgres';
import {
  UserField,
  MeetingField,
  FullMeetingField,
  CustomersTableType,
  TaskForm,
  TasksTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTasks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.title,
        tasks.duedate, 
        tasks.assignedId,
        tasks.assignerId,
        tasks.meetingId,
        tasks.priority, 
        tasks.status,
        assigner.name AS assignername,
        assigned.name AS assignedname,
        meetings.title AS meetingtitle
      FROM tasks
      JOIN users AS assigner ON tasks.assignerId = assigner.id
      JOIN users AS assigned ON tasks.assignedId = assigned.id
      JOIN meetings ON tasks.meetingId = meetings.id
      WHERE
        assigner.name ILIKE ${`%${query}%`} OR
        assigned.name ILIKE ${`%${query}%`} OR
        meetings.title ILIKE ${`%${query}%`} OR
        tasks.title ILIKE ${`%${query}%`} OR
        tasks.assignedId::text ILIKE ${`%${query}%`} OR
        tasks.assignerId::text ILIKE ${`%${query}%`} OR
        tasks.meetingId::text ILIKE ${`%${query}%`} OR
        tasks.priority ILIKE ${`%${query}%`} OR
        tasks.duedate::text ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
      ORDER BY tasks.duedate DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}


export async function fetchTasksPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tasks
    JOIN users ON tasks.assignedId = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      tasks.title ILIKE ${`%${query}%`} OR
      tasks.assignedId::text ILIKE ${`%${query}%`} OR
      tasks.assignerId::text ILIKE ${`%${query}%`} OR
      tasks.meetingId::text ILIKE ${`%${query}%`} OR
      tasks.priority ILIKE ${`%${query}%`} OR
      tasks.duedate::text ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql<TaskForm>`
      SELECT
        tasks.id,
        tasks.title,
        tasks.duedate,
        tasks.assignedId,
        tasks.assignerId,
        tasks.meetingId,
        tasks.priority,
        tasks.status
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    const task = data.rows
    return task[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchUserXP() {
  try {
    const data = await sql<{ id: string; name: string; email: string; xp: number }>`
      SELECT
        id,
        name,
        email,
        xp
      FROM users
      ORDER BY xp DESC
    `;
    return data.rows; // Returns an array of users with XP data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user XP data.');
  }
}

export async function fetchMeetings() {
  try {
    const data = await sql<MeetingField>`
      SELECT
        id,
        title
      FROM meetings
      ORDER BY title ASC
    `;

    const meetings = data.rows;
    return meetings;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all meetings.');
  }
}

export async function fetchFullMeetings() {
  try {
    const data = await sql<FullMeetingField>`
      SELECT *
      FROM meetings
    `;

    const meetings = data.rows;
    return meetings;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all meetings.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
