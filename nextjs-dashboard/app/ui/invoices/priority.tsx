import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskPriority({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': priority === 'low',
          'bg-green-500 text-white': priority === 'medium',
          'bg-gray-100 text-white': priority === 'high',
        },
      )}
    >
      {priority === 'low' ? (
        <>
          Low
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {priority === 'medium' ? (
        <>
          Medium
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
            {priority === 'high' ? (
        <>
          High
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}
