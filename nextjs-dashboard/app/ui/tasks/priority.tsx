import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskPriority({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': priority === 'low',
          'bg-gray-200 text-gray-500': priority === 'medium',
          'bg-gray-300 text-gray-500': priority === 'high',
        },
      )}
    >
      {priority === 'low' ? (
        <>
          Low
        </>
      ) : null}
      {priority === 'medium' ? (
        <>
          Medium
        </>
      ) : null}
            {priority === 'high' ? (
        <>
          High
        </>
      ) : null}
    </span>
  );
}
