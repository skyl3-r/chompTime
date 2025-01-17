'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    // id: z.string(),
    // customerId: z.string({
    //     invalid_type_error: "Please select a customer.",
    // }),
    // amount: z.coerce.number()
    // .gt(0, { message: 'Please enter an amount greater than $0.'}),
    // status: z.enum(['pending', 'paid'], {
    //     invalid_type_error: "Please select an invoice status."
    // }),
    // date: z.string(),


    id: z.string(),
    title: z.string({
        invalid_type_error: "Please enter a title.",
    }), // Title must be a string.
    duedate: z.string({
        invalid_type_error: "Please select a date.",
    }), // Due date must be a string.
    assignedId: z.string({
        invalid_type_error: "Please assign the task to someone.",
    }), // Assigned ID must be a string.
    assignerId: z.string({
      invalid_type_error: "Please choose the assigner.",
    }), // Assigner ID must be a string.
    meetingId: z.string({
        invalid_type_error: "Please associate this task with a meeting.",
    }), // Meeting ID must be a string.
    priority: z.enum(['low', 'medium', 'high'], {
        invalid_type_error: "Please select a valid priority level.",
    }), // Priority must be one of 'low', 'medium', or 'high'.
    status: z.enum(['pending', 'completed'], {
        invalid_type_error: "Please select an task status.",
    }), // Status must be 'pending' or 'completed'.
    dayReminderSent: z.boolean().default(false),
    hourReminderSent: z.boolean().default(false),
  });

  const MeetingFormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: "Please enter a title.",
    }), // Title must be a string.
    starttime: z.string({
        invalid_type_error: "Please select a date.",
    }), // Start time must be a string.
    endtime: z.string({
      invalid_type_error: "Please select a date.",
  }), // End time must be a string.
    locationlink: z.string({
      invalid_type_error: "Please enter the location or link for this meeting"
    }),
    dayReminderSent: z.boolean().default(false),
    hourReminderSent: z.boolean().default(false),
  });
   

  const ParticipantFormSchema = z.object({
    id: z.string(),
    userid: z.string({
        invalid_type_error: "Please choose a participant to add.",
    }), // Assigned ID must be a string.
    meetingid: z.string({
        invalid_type_error: "Please choose a meeting to add to.",
    }), // Meeting ID must be a string.
  });

const CreateMeeting = MeetingFormSchema.omit({ id: true});
const CreateParticipant = ParticipantFormSchema.omit({ id: true });
const CreateTask = FormSchema.omit({ id: true });
const UpdateTask = FormSchema.omit({id: true }); 

export type State = {
    errors?: {
        // customerId?: string[];
        // amount?: string[];
        // status?: string[];

        // id?: string[];
        title?: string[];
        duedate?: string[];
        assignedId?: string[];
        assignerId?: string[];
        meetingId?: string[];
        priority?: string[];
        status?: string[];
    };
    message?: string | null;
};

export type MeetingState = {
  errors?: {
    title?: string[];
    starttime?: string[];
    endtime?: string[];
    locationlink?: string[];
  };
  message?: string | null;
}

export type ParticipantState = {
  errors?: {
      userid?: string[];
      meetingid?: string[];
  };
  message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({

    // customerId: formData.get('customerId'),
    // amount: formData.get('amount'),
    // status: formData.get('status'),

    title: formData.get('title'),
    duedate: formData.get('duedate'),
    assignedId: formData.get('assignedId'),
    assignerId: formData.get('assignerId'),
    meetingId: formData.get('meetingId'),
    priority: formData.get('priority'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Task.',
    };
  }

  // const { customerId, title, amount, status } = validatedFields.data;
  const { title, duedate, assignedId, assignerId, meetingId, priority, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  try {
    console.log('Validated Data:', {
      title, duedate, assignedId, assignerId, meetingId, priority, status
    });
    
    await sql`
        INSERT INTO tasks (title, duedate, assignedId, assignerId, meetingId, priority, status, dayReminderSent, hourReminderSent)
        VALUES (${title}, ${duedate}, ${assignedId}, ${assignerId}, ${meetingId}, ${priority}, ${status}, false, false)
    `;
  } catch (error) {
    return {
        message: 'Database Error: Failed to Create Task.',
    }
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createMeeting(prevState: State, formData: FormData) {
  const validatedFields = CreateMeeting.safeParse({
    // customerId: formData.get('customerId'),
    // amount: formData.get('amount'),
    // status: formData.get('status'),

    title: formData.get('title'),
    starttime: formData.get('starttime'),
    endtime: formData.get('endtime'),
    locationlink: formData.get('locationlink'),
  });

  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Meeting.',
    };
  }

  // const { customerId, title, amount, status } = validatedFields.data;
  const { title, starttime, endtime, locationlink } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  try {
    // console.log('Validated Data:', {
    //   title, starttime, endtime, locationlink
    // });
    
    await sql`
        INSERT INTO meetings (title, starttime, endtime, locationlink, dayReminderSent, hourReminderSent)
        VALUES (${title}, ${starttime}, ${endtime}, ${locationlink}, false, false)
    `;
  } catch (error) {
    return {
        message: 'Database Error: Failed to Create Task.',
    }
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function createParticipant(prevState: ParticipantState, formData: FormData) {
  const validatedFields = CreateParticipant.safeParse({
    userid: formData.get('userid'),
    meetingid: formData.get('meetingid'),
  });

  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Participant.',
    };
  }

  // const { customerId, title, amount, status } = validatedFields.data;
  const { userid, meetingid } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  try {
    // console.log('Validated Data:', {
    //   userid, meetingid
    // });
    
    const existingParticipant = await sql`
      SELECT * FROM participants WHERE userid = ${userid} AND meetingid = ${meetingid}
    `;

    if (existingParticipant.rows.length > 0) {
      return {
        message: 'Participant already exists for this meeting.',
      };
    }

    // Insert new participant and update user XP in a transaction
    await sql`
        INSERT INTO participants (userid, meetingid)
        VALUES (${userid}, ${meetingid})
      `;

    await sql`
        UPDATE users
        SET xp = xp + 50
        WHERE id = ${userid}
      `;
  } catch (error) {
    return {
        message: 'Database Error: Failed to Create Participant.',
    }
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateTask(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateTask.safeParse({
      // customerId: formData.get('customerId'),
      // amount: formData.get('amount'),
      // status: formData.get('status'),
      title: formData.get('title'),
      duedate: formData.get('duedate'),
      assignedId: formData.get('assignedId'),
      assignerId: formData.get('assignerId'),
      meetingId: formData.get('meetingId'),
      priority: formData.get('priority'),
      status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Task.',
        };
    }
   
    // const { customerId, amount, status } = validatedFields.data;
    const { title, duedate, assignedId, assignerId, meetingId, priority, status } = validatedFields.data;
    // const amountInCents = amount * 100;
   
    try {
      console.log('Validated Data:', {
        title, duedate, assignedId, assignerId, meetingId, priority, status
      });
        await sql`
        UPDATE tasks
        SET title = ${title}, duedate = ${duedate}, assignedId = ${assignedId}, assignerId = ${assignerId}, meetingId = ${meetingId}, priority = ${priority}, status = ${status}
        WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Task.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }
  
  export async function deleteInvoice(id: string, prevState: State) {
    try {
        await sql`DELETE FROM tasks WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Task.'};
    }
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function register(
    prevState: string | undefined,
    formData: FormData,
  ) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const result = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (result.rows.length > 0) {
        return "Email already in use."
      }
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Dynamic or fallback
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {name, email, password}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Registration success", response);
    } catch (error: any) {
      console.error("Registration failed", error);
      return "Something went wrong"
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }