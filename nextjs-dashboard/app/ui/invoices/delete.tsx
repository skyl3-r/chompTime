"use server";  // Place at the top of the file

import { deleteTask } from '@/app/lib/actions';

export async function deleteInvoiceFromForm(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    console.error('Error: Missing invoice ID.');
    return;
  }
  await deleteTask(id);  // Assuming deleteInvoice handles logging and messages.
}