import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-4">
      <FaceFrownIcon className="w-12 text-gray-400" />
      <h2 className="text-xl font-semibold">No Users Found</h2>
      <p>There are no users with XP data available.</p>
      <Link
        href="/dashboard/customers"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}