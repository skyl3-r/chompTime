import Calendar from '@/app/dashboard/components/NewCalendar';
import { fetchFullMeetings } from '@/app/lib/data';
import { Metadata } from 'next';
import { CreateMeeting, CreateParticipant } from '@/app/ui/tasks/buttons';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default async function Page() {
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
      <div className="">
        <h2 className={`${lusitana.className} mb-4 text-lg md:text-2xl`}>Calendar</h2>
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
