import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';

// export default function Page() {
//   return (
//     <main className="flex min-h-screen flex-col p-6">
//       <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
//         <AcmeLogo />
//       </div>
//       <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
//         <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
//         <div
//   className={styles.shape}
// />
//           <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
//             <strong>Welcome to Chomp Time! </strong> Your personal work assistant,
//             brought to you by HackForHer.
//           </p>
//           <div className='flex flex-row'>
//             <Link
//               href="/login"
//               className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base mr-4"
//             >
//               <span>Log in</span> 
//             </Link>
//             <Link
//               href="/signup"
//               className="flex items-center gap-5 self-start rounded-lg bg-neutral-300 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200 md:text-base"
//             >
//               <span>Sign up</span>
//             </Link>
//           </div>
          
//         </div>
//         <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
//           {/* Add Hero Images Here
//           <Image
//             src="/hero-desktop.png"
//             width={1000}
//             height={760}
//             className='hidden md:block' //hidden to remove image from mobile, md:block to show on desktop
//             alt="Screenshots of the dashboard project showing desktop version"
//           />
//           <Image
//             src="/hero-mobile.png"
//             width={560}
//             height={620}
//             className="block md:hidden"
//             alt="Screenshot of the dashboard project showing mobile version"
//           /> */}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default function Page() {
//   return (
//     <main className="flex min-h-screen flex-col p-6">
//       <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
//         <AcmeLogo />
//       </div>
//       <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
//         <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
//           {/* Removed the triangle */}
//           {/* <div className={styles.shape} /> */}
//           <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
//             <strong>Welcome to Chomp Time! </strong> Your personal work assistant,
//             brought to you by HackForHer.
//           </p>
//           <div className="flex flex-row">
//             <Link
//               href="/login"
//               className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base mr-4"
//             >
//               <span>Log in</span>
//             </Link>
//             <Link
//               href="/signup"
//               className="flex items-center gap-5 self-start rounded-lg bg-neutral-300 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200 md:text-base"
//             >
//               <span>Sign up</span>
//             </Link>
//           </div>
//         </div>
//         <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
//           {/* Add Hero Images Here */}
//         </div>
//       </div>
//     </main>
//   );
// }

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Chomp Time! </strong> Your personal work assistant,
            brought to you by HackForHer.
          </p>
          <div className="flex flex-row">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base mr-4"
            >
              <span>Log in</span>
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-5 self-start rounded-lg bg-neutral-300 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200 md:text-base"
            >
              <span>Sign up</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Added section */}
          <p className="text-center text-gray-600 text-lg font-semibold mb-4">
            Created for Singapore Book Council
          </p>
          <Image
            src="/bookcouncil.png" 
            alt="Singapore Book Council Logo"
            width={300} 
            height={300} 
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </main>
  );
}