import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUsers, fetchMeetings } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Task',
}

export default async function Page() {
  const users = await fetchUsers();
  const meetings = await fetchMeetings();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Task', href: '/dashboard/invoices' },
          {
            label: 'Create Task',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form users={users} meetings={meetings}/>
    </main>
  );
}