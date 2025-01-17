"use server";  // Place at the top of the file

import { deleteInvoice, State } from '@/app/lib/actions';

export async function deleteInvoiceFromForm(formData: FormData) {
  const id = formData.get("id") as string;
  const initialState: State = {message: null, errors: {}};
  
  if (!id) {
    console.error('Error: Missing invoice ID.');
    return;
  }
  await deleteInvoice(id, initialState);  // Assuming deleteInvoice handles logging and messages.
}