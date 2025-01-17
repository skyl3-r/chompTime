import Calendar from '@/app/dashboard/components/NewCalendar';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana, inter } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData, fetchFullMeetings } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default async function Page() {
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices();
    // const { 
    //     numberOfInvoices,
    //     numberOfCustomers,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = await fetchCardData();
    const m = await fetchFullMeetings();
    const m2 = m.map((meeting) => {
      return {
        title: meeting.title,
        start: new Date(meeting.starttime).toISOString().slice(0, -5) + 'Z',
        end: new Date(meeting.endtime).toISOString().slice(0, -5) + 'Z',
        allDay: false,
      }
    })
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Calendar
      </h1>

      <div className={`${inter.className} mt-6`}>
        <Calendar meetings={m2}/>
      </div>
      <div className="flex mt-6">
      <CreateMeeting />
      </div>
    </main>
  );
}

export function CreateMeeting() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="">Create Meeting</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}