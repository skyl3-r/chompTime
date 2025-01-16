import Form from '@/app/ui/invoices/edit-form'; // imports "EditInvoiceForm"
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTaskById, fetchUsers, fetchMeetings } from '@/app/lib/data';
import { notFound } from 'next/navigation'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Invoice',
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [task, users, meetings] = await Promise.all([
        fetchTaskById(id),
        fetchUsers(),
        fetchMeetings(),
    ]);

    if (!task) {
        notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} users={users} meetings={meetings} />
    </main>
  );
}