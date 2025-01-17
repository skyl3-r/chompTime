'use client';

import { UserField, MeetingField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createParticipant, ParticipantState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ users, meetings }: { users: UserField[]; meetings: MeetingField[] }) {
  const initialState: ParticipantState = { message: null, errors: {}};
  const [state, formAction] = useActionState(createParticipant, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* User Id*/}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose Participant
          </label>
          <div className="relative">
            <select
              id="user"
              name="userid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='user-error'
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="user-error" aria-live="polite" aria-atomic="true">
          {state.errors?.userid &&
            state.errors.userid.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
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
              name="meetingid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='meeting-error'
            >
              <option value="" disabled>
                Select an assigned meeting
              </option>
              {meetings.map((meeting) => (
                <option key={meeting.id} value={meeting.id}>
                  {meeting.title}
                </option>
              ))}
            </select>
            <ComputerDesktopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="meeting-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingid &&
            state.errors.meetingid.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        </div>

        <div id="overall-error" aria-live="polite" aria-atomic="true">
            {state.message &&
                <p className="mt-2 text-sm text-red-500" key={state.message}>
                  {state.message}
                </p>
              }
          </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}