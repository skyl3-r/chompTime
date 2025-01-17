import { UpdateTask, DeleteTask } from '@/app/ui/invoices/buttons';
import TaskStatus from '@/app/ui/invoices/status';
import TaskPriority from '@/app/ui/invoices/priority';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTasks } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assigned To
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assigner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Meeting Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{task.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.assignedname}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.assignername}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.meetingtitle}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(task.duedate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskPriority priority={task.priority} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


  {/*
          Mobile View 
          <div className="md:hidden">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{task.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.assignedId}</p>
                  </div>
                  <TaskStatus status={task.status} />
                  <TaskPriority priority={task.priority} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {task.meetingId}
                    </p>
                    <p>{formatDateToLocal(task.duedate)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={task.id} />
                    <DeleteTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          */}
