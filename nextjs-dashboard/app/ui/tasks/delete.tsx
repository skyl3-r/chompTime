"use server";  // Place at the top of the file

import { deleteTask, State } from '@/app/lib/actions';

export async function deleteTaskFromForm(formData: FormData) {
  const id = formData.get("id") as string;
  const initialState: State = {message: null, errors: {}};
  
  if (!id) {
    console.error('Error: Missing task ID.');
    return;
  }
  await deleteTask(id, initialState);  // Assuming deleteTask handles logging and messages.
}