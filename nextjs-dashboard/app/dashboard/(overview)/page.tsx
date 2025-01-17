import Calendar from '@/app/dashboard/components/NewCalendar';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana, inter } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData, fetchFullMeetings } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateMeeting, CreateParticipant } from '@/app/ui/tasks/buttons';

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

      {/* // <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      //   Calendar
      // </h1>

      // <div className={`${inter.className} mt-6`}>
      //   <Calendar meetings={m2}/> */}




      {/* <h1 className={"mb-4 text-xl md:text-2xl"}>
        Dashboard
      </h1> */}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div> */}

      <div className="mt-6">
        <h2 className="mb-4 text-lg md:text-2xl">Calendar</h2>
        <Calendar />


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
