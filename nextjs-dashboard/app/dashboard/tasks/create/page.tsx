import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
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
          { label: 'Task', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form users={users} meetings={meetings}/>
    </main>
  );
}