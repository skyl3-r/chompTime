import Form from '@/app/ui/dashboard/create-participant-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchUsers, fetchMeetings } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Participant',
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
            label: 'Add Participant',
            href: '/dashboard/createparticipant',
            active: true,
          },
        ]}
      />
      <Form users={users} meetings={meetings}/>
    </main>
  );
}