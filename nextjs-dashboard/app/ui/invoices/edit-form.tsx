'use client';

import { UserField, MeetingField, TaskForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, updateInvoice } from '@/app/lib/actions';
//updateInvoice changed already, just that name havent change
import { useActionState } from 'react';

export default function EditInvoiceForm({
  task,
  users,
  meetings,
}: {
  task: TaskForm;
  users: UserField[];
  meetings: MeetingField[];
}) {
  const initialState: State = {message: null, errors: {}};
  const updateTaskWithId = updateInvoice.bind(null, task.id);
  const [state, formAction] = useActionState(updateTaskWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Task Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Task Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={task.title}
                placeholder="Enter task title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="duedate" className="mb-2 block text-sm font-medium">
            Due Date
          </label>
          <input
            id="duedate"
            name="duedate"
            type="datetime-local"
            defaultValue={task.duedate}
            placeholder="Enter due date and time"
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
      
        {/* Assigned Id */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose assigned user
          </label>
          <div className="relative">
            <select
              id="user"
              name="assignedId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.assignedId}
            >
              <option value="" disabled>
                Select a assigned user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>


        {/* MeetingId */}
        <div className="mb-4">
          <label htmlFor="meeting" className="mb-2 block text-sm font-medium">
            Choose assigned meeting
          </label>
          <div className="relative">
            <select
              id="meeting"
              name="meetingId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.meetingId}
            >
              <option value="" disabled>
                Select a assigned meeting
              </option>
              {meetings.map((meeting) => (
                <option key={meeting.id} value={meeting.id}>
                  {meeting.title}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Task Priority */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="low"
                  name="priority"
                  type="radio"
                  value="low"
                  defaultChecked={task.priority === 'low'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="low"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Low <ClockIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="medium"
                  name="priority"
                  type="radio"
                  value="medium"
                  defaultChecked={task.priority === 'medium'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="medium"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Medium <CheckIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="high"
                  name="priority"
                  type="radio"
                  value="high"
                  defaultChecked={task.priority === 'high'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="high"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  High <CheckIcon className="h-4 w-4" />
                </label>
              </div>

            </div>
          </div>
        </fieldset>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={task.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status"
                  type="radio"
                  value="completed"
                  defaultChecked={task.status === 'completed'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Completed <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Task</Button>
      </div>
    </form>
  );
}

        // {/* Invoice Amount */}
        // <div className="mb-4">
        //   <label htmlFor="amount" className="mb-2 block text-sm font-medium">
        //     Choose an amount
        //   </label>
        //   <div className="relative mt-2 rounded-md">
        //     <div className="relative">
        //       <input
        //         id="amount"
        //         name="amount"
        //         type="number"
        //         step="0.01"
        //         defaultValue={invoice.amount}
        //         placeholder="Enter USD amount"
        //         className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        //       />
        //       <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        //     </div>
        //   </div>
        // </div>