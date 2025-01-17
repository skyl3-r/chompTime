'use client';

import { UserField, MeetingField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  CalendarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMeeting, MeetingState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ users, meetings }: { users: UserField[]; meetings: MeetingField[] }) {
  const initialState: MeetingState = { message: null, errors: {}};
  const [state, formAction] = useActionState(createMeeting, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


      {/* Meeting Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Meeting Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter meeting title"
                className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label htmlFor="starttime" className="mb-2 block text-sm font-medium">
            Start Time
          </label>
          <input
            id="starttime"
            name="starttime"
            type="datetime-local"
            placeholder="Enter due date and time"
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="starttime-error"
          />
          <div id="starttime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.starttime &&
              state.errors.starttime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label htmlFor="endtime" className="mb-2 block text-sm font-medium">
            End Time
          </label>
          <input
            id="endtime"
            name="endtime"
            type="datetime-local"
            placeholder="Enter due date and time"
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="starttime-error"
          />
          <div id="endtime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.endtime &&
              state.errors.endtime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Location link */}
        <div className="mb-4">
          <label htmlFor="locationlink" className="mb-2 block text-sm font-medium">
            Physical Location or Online Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="locationlink"
                name="locationlink"
                type="text"
                placeholder="Enter location or link"
                className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="locationlink-error"
              />
            </div>
          </div>
          <div id="locationlink-error" aria-live="polite" aria-atomic="true">
            {state.errors?.locationlink &&
              state.errors.locationlink.map((error: string) => (
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
        <Button type="submit">Create Meeting</Button>
      </div>
    </form>
  );
}

{/*     // Invoice Amount
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='amount-error'
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> 
        
        */}