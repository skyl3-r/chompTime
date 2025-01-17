import Form from '@/app/ui/tasks/edit-form'; // imports "EditTaskForm"
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchTaskById, fetchUsers, fetchMeetings } from '@/app/lib/data';
import { notFound } from 'next/navigation'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Task',
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
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Edit Task',
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} users={users} meetings={meetings} />
    </main>
  );
}