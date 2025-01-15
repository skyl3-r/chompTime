"use server";  // Place at the top of the file

import { deleteInvoice } from '@/app/lib/actions';

export async function deleteInvoiceFromForm(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    console.error('Error: Missing invoice ID.');
    return;
  }
  await deleteInvoice(id);  // Assuming deleteInvoice handles logging and messages.
}