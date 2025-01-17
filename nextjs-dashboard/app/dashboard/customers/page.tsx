import { Metadata } from 'next';
//import { lusitana } from '@/app/ui/fonts';
import { fetchUserXP } from '@/app/lib/data';
//import SharkPopup from './SharkPopup';

export const metadata: Metadata = {
  title: 'Users XP',
};

// async function fetchUsers() {
//   const response = await fetch('/api/users');
//   if (!response.ok) {
//     throw new Error('Failed to fetch user data');
//   }
//   const data = await response.json();
//   return data.users;
// }

// function SharkPopup({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative w-96 p-6 bg-white rounded-lg shadow-lg">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <div className="flex flex-col items-center text-center">
//           <img
//             src="/shark-cute.png" // Add a shark image in your public folder with this name or use an appropriate link
//             alt="Shark"
//             className="mb-4 w-24 h-24"
//           />
//           <h2 className="text-xl font-semibold text-blue-600">Hello there!</h2>
//           <p className="mt-2 text-gray-600">
//             Complete tasks and attend meetings on time to earn more XP!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

function SharkSpeechBubble() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-4 p-4 bg-blue-100 rounded-lg shadow-lg border border-blue-300">
      <img
        src="/shark-cute.png" // Make sure the image exists in the public folder
        alt="Shark"
        className="w-16 h-16"
      />
      <div className="text-gray-700">
        <p className="text-lg font-semibold">Hey there!</p>
        <p>Complete tasks and attend meetings on time to earn more XP!</p>
      </div>
    </div>
  );
}

export default async function Page() {
  const users = await fetchUserXP();

  return (
    <main className="w-full px-4 py-8">
      <h1 className={"text-2xl font-bold mb-6 text-center text-blue-600"}>
        XP Leaderboard
      </h1>
      <div className="overflow-hidden rounded-lg shadow-lg bg-white">
        {/* Desktop Table */}
        <table className="hidden md:table w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-6 py-4 text-left font-semibold text-blue-700">
                Name
              </th>
              <th className="border px-6 py-4 text-left font-semibold text-blue-700">
                Email
              </th>
              <th className="border px-6 py-4 text-center font-semibold text-blue-700">
                XP
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-blue-50 ${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <td className="border px-6 py-4 text-blue-900">{user.name}</td>
                <td className="border px-6 py-4 text-blue-900">{user.email}</td>
                <td className="border px-6 py-4 text-center font-bold text-blue-900">
                  {user.xp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg bg-blue-50 p-4 shadow-md border border-blue-200"
            >
              <p className="text-lg font-semibold text-blue-900">{user.name}</p>
              <p className="text-sm text-blue-700">{user.email}</p>
              <p className="mt-2 text-lg font-bold text-blue-600">
                XP: {user.xp}
              </p>
            </div>
          ))}
        </div>
      </div>
      <SharkSpeechBubble />
    </main>
  );
}