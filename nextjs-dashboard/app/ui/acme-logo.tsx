import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <div className="flex flex-col">
        <p className="text-[30px]">Chomp</p>
        <p className="text-[30px]">Time</p>
      </div>
    </div>
  );
}
