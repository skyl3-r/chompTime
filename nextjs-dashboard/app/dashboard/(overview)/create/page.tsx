import Form from '@/app/ui/dashboard/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchUsers, fetchMeetings } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Meeting',
}

export default async function Page() {
  const users = await fetchUsers();
  const meetings = await fetchMeetings();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Calendar', href: '/dashboard' },
          {
            label: 'Create Meeting',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form users={users} meetings={meetings}/>
    </main>
  );
}