import Calendar from '@/app/dashboard/components/NewCalendar';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana, inter } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData, fetchFullMeetings } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateMeeting, CreateParticipant } from '@/app/ui/invoices/buttons';

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
      <div className="flex flex row mt-6">
        <div className='mr-3'>
      <CreateMeeting />
        </div>
      <CreateParticipant />
      </div>
    </main>
  );
}
