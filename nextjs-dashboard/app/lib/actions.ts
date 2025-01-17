'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
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
   
const CreateTask = FormSchema.omit({ id: true });
const UpdateTask = FormSchema.omit({id: true }); 

export type State = {
    errors?: {
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
export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
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

  const { title, duedate, assignedId, assignerId, meetingId, priority, status } = validatedFields.data;

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
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateTask.safeParse({
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
   
    const { title, duedate, assignedId, assignerId, meetingId, priority, status } = validatedFields.data;
   
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
   
    revalidatePath('/dashboard/tasks');
    redirect('/dashboard/tasks');
  }
  
  export async function deleteTask(id: string, prevState: State) {
    try {
        await sql`DELETE FROM tasks WHERE id = ${id}`;
        revalidatePath('/dashboard/tasks');
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