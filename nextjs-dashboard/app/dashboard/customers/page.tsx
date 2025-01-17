import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { fetchUserXP, fetchUsers} from '@/app/lib/data';

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

// 

export default async function Page() {
    const users = await fetchUserXP();
    let loggedInUserEmail = null;
  
    // Check if window is available (for SSR safety) and retrieve logged-in user email
    if (typeof window !== 'undefined') {
      loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    }
  
    return (
      <main className="w-full px-4 py-8">
        <h1 className={`${lusitana.className} text-3xl font-bold mb-6 text-center`}>
          XP Leaderboard
        </h1>
        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-6 py-4 text-left font-semibold text-gray-600">
                  Name
                </th>
                <th className="border px-6 py-4 text-left font-semibold text-gray-600">
                  Email
                </th>
                <th className="border px-6 py-4 text-center font-semibold text-gray-600">
                  XP
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 ${
                    user.email === loggedInUserEmail
                      ? 'bg-yellow-200 text-blue-800 font-bold border-b-4 border-blue-400' // Enhanced highlight
                      : index % 2 === 0
                      ? 'bg-gray-50'
                      : 'bg-white'
                  }`}
                >
                  <td className="border px-6 py-4 flex items-center gap-2">
                    {user.email === loggedInUserEmail && (
                      <span className="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                    {user.name}
                  </td>
                  <td className="border px-6 py-4">{user.email}</td>
                  <td className="border px-6 py-4 text-center">{user.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`rounded-lg p-4 shadow-md flex flex-col gap-2 ${
                  user.email === loggedInUserEmail
                    ? 'bg-yellow-200 text-blue-800 font-bold border-l-4 border-blue-400'
                    : 'bg-gray-50'
                }`}
              >
                {user.email === loggedInUserEmail && (
                  <span className="self-start inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                    You
                  </span>
                )}
                <p className="text-lg">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-2 text-lg text-blue-600">XP: {user.xp}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }