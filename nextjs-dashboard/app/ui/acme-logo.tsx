// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { GiSharkFin } from "react-icons/gi";
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GiSharkFin className="h-12 w-12 rotate-[10deg] mr-2" />
      <p className="flex text-[35px]">Chomp Time</p>
    </div>
  );
}
